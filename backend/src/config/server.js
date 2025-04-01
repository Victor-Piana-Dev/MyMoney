import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BillingCycle from './database.js';
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Usuario from './user.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors())


//rotas:

server.get('/api/billingCycles', async (req, res) => {
    try {
        const people = await BillingCycle.find() //retorna todos os dados da tabela
        res.status(200).json(people)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

//rota de count: deve vir antes da rota do ID, se for colocado depois o código pode interpretar o /count como um id

server.get('/api/billingCycles/count', async (req, res) => {
    try {
        const people = await BillingCycle.find() //retorna todos os dados da tabela
        const totalRegistersCount = people.length
        res.status(200).json(totalRegistersCount)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

server.get('/api/billingCycles/summary', checkToken, async (req, res) => {
    try {
        const result = await BillingCycle.aggregate([
            {
                $project: { // Projeta os campos necessários, criando novos campos para soma dos valores de créditos e débitos
                    creditTotal: { $sum: "$credits.value" }, // Soma todos os valores dentro do array "credits"
                    debitTotal: { $sum: "$debts.value" } // Soma todos os valores dentro do array "debts"
                }
            },
            {
                $group: { // Agrupa todos os registros e calcula o total geral
                    _id: null, // Não precisamos de um agrupamento por ID específico, então usamos null
                    totalCredits: { $sum: "$creditTotal" }, // Soma os totais de crédito de todos os registros
                    totalDebits: { $sum: "$debitTotal" } // Soma os totais de débito de todos os registros
                }
            }
        ]);

        if (result.length === 0) { // Se não houver registros na coleção, retorna 0 para ambos os valores
            return res.status(200).json({ totalCredits: 0, totalDebits: 0 });
        }

        res.status(200).json(result[0]); // Retorna o primeiro (e único) resultado da agregação
    } catch (error) {
        res.status(500).json({ error: "Erro ao calcular o resumo dos ciclos de cobrança" }); // Retorna erro caso algo falhe
    }
});


server.get('/api/billingCycles/:id', async (req, res) => {
    const id = req.params.id //o id deve vir pelo params e não pelo body nesse caso, params é o que vem na URL
    try {
        const person = await BillingCycle.findOne({ _id: id }) //id no mongodb é _id, precisamos buscar o _id que é igual ao id que vem da requisicao
        if (!person) {
            res.status(422).json({ message: 'O usuário não foi encontrado' })
            return //se não foi encontrado podemos sair com return
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

server.post('/api/billingCycles', async (req, res) => {
    const { name, month, year, credits, debts } = req.body

    // if(year > 2100){ //se não veio o nome do req.body 
    //     res.status(422).json({error: 'O ano deve ser menor ou igual a 2100'})
    // }

    // if(year < 1970){ //se não veio o nome do req.body 
    //     res.status(422).json({error: 'O ano deve ser maior ou igual a 1970'})
    // }

    const novoBillingCycle = new BillingCycle({
        name: name,
        month: month,
        year: year,
        credits: credits,
        debts: debts
    })
    try {
        await novoBillingCycle.save()

        res.status(201).json({ message: 'Adicionado com sucesso ao banco', novoBillingCycle })

    } catch (error) {

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(422).json({ errors: messages });
        }

        res.status(500).json({ message: "Aconteceu um erro no servidor, tente novamente mais tarde" })
    }
})

server.put('/api/billingCycles/', async (req, res) => {

    // if(req.body.year > 2100){ 
    //     res.status(422).json({error: 'O ano deve ser menor ou igual a 2100'})
    // }

    try {
        const { id, name, month, year, credits, debts } = req.body; // Desestruturando os dados diretamente de req.body

        const updatedRegister = {
            name,
            month,
            year,
            credits,
            debts
        }

        // Atualizando o ciclo de cobrança com base no id
        const verify = await BillingCycle.updateOne({ _id: id }, updatedRegister, { runValidators: true });

        if (verify.matchedCount === 0) {
            return res.status(422).json({ message: 'O ciclo de cobrança não foi encontrado, ou os dados não foram alterados' });
        }

        // Retornando os dados atualizados
        res.status(200).json(updatedRegister);

    } catch (error) {

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(422).json({ errors: messages });
        }

        res.status(500).json({ error: error });
    }
});


server.delete('/api/billingCycles/', async (req, res) => {
    const { id } = req.body; // Pegando o ID do body

    if (!id) {
        return res.status(400).json({ message: 'ID é obrigatório para deletar um ciclo de cobrança' });
    }

    try {
        const billingCycle = await BillingCycle.findById(id);

        if (!billingCycle) {
            return res.status(404).json({ message: 'Ciclo de cobrança não encontrado' });
        }

        await BillingCycle.deleteOne({ _id: id });

        res.status(200).json({ message: 'Ciclo de cobrança deletado com sucesso' });

    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar o ciclo de cobrança' });
    }
});









//Parte do usuário:

server.post('/auth/register', async (req, res) => {
    const { name, email, password, confirmpassword } = req.body

    //validations
    if (!name) {
        return res.status(422).json({ message: 'O nome é obrigatório' })
    }
    if (!email) {
        return res.status(422).json({ message: 'O email é obrigatório' })
    }
    if (!password) {
        return res.status(422).json({ message: 'A senha é obrigatória' })
    }
    if (password !== confirmpassword) {
        return res.status(422).json({ message: 'As senhas não conferem' })
    }

    //Verifica se o email já está cadastrado no banco para não cadastrar o mesmo usuário 2 vezes:

    const userExists = await Usuario.findOne({ email: email })

    if(userExists){
        return res.status(422).json({message: 'Este e-mail já está cadastrado, por favor utilize outro e-mail'})
    }

    const salt = await bcrypt.genSalt(12) //adiciona alguns dígitos a mais em relação a senha original do usuário, para que seja mais difícil de ser hackeada
    const passwordHash = await bcrypt.hash(password, salt) //passa a senha original mais os caracteres do salt e armazena na variavel passwordHash

    //criando o usuario

    const person = new Usuario({
        name:name,
        email:email,
        password: passwordHash 
    })

    try {
        await person.save()

        res.status(201).json({message: 'Usuário criado com sucesso!', person})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Aconteceu um erro no servidor, tente novamente mais tarde"})
    }

})


// Rota de Login:

server.post('/auth/login', async(req, res) => {
    const {email, password} = req.body
    // Validação para verificar se os campos não vieram vazios:
    if(!email){
        return res.status(422).json({message: "O email é obrigatório"})
    }
    if(!password){
        return res.status(422).json({message: "A senha é obrigatória"})
    }

    //Verifica se o email já está cadastrado no banco para poder realizar o login:

    const user = await Usuario.findOne({email:email}) //user verifica se existe um email igual ao informado pelo req.body e retorna todos os dados (nome, email, password) para a variavel user caso encontrado

    if(!user){
        return res.status(404).json({message: "Este usuário ainda não está cadastrado"})
    }

    // verifica se a senha informada no req.body que foi guardada na const user bate com a senha que está armazenada no banco:

    const checkPassword = await bcrypt.compare(password, user.password) //o bcrypt já faz a descriptação da senha armazenada no banco por trás dos panos para poder fazer a comparação

    if(!checkPassword){ //se a senha não bateu
        return res.status(422).json({message: "Senha inválida"})
    }

    try {

        // criação do token que é enviado para o usuário que faz o login

        const secret = process.env.SECRET //pega o valor do secret no .env(o arquivo .env deve ser criado para que o secret seja armazenado, o valor do secret criado pode ser definido aleatóriamente pelo desenvolvedor)

        const token = jwt.sign({ //token do jwt é gerado a partir do id e do secret
            id: user._id
        }, secret, { expiresIn: '1h' }) //tempo de expiração do token

         // Remove a senha do objeto user para não enviá-la junto dos outros dados
         const { password, ...userWithoutPassword } = user.toObject(); //A função .toObject() no Mongoose é usada para converter um documento Mongoose (que é uma instância de um modelo) em um objeto JavaScript simples. Quando você consulta o banco de dados usando o Mongoose, ele retorna documentos que são instâncias de um modelo Mongoose. Essas instâncias possuem métodos e propriedades adicionais que não estão presentes em objetos JavaScript simples. A função .toObject() remove esses métodos extras e retorna um objeto JavaScript puro, que pode ser manipulado de forma mais direta e sem os métodos do Mongoose.

    res.status(200).json({message: 'Autenticação realizada com sucesso', token, user: userWithoutPassword}) //envia o token para o usuário e uma mensagem de sucesso
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Aconteceu um erro no servidor, tente novamente mais tarde"})
    }
})



// Rota privada (só pode ser acessada por usuários que possuem o token, ou seja que fizeram o login): //essa rota serve para quando um usuário quer pesquisar por outro usuário

server.get("/user/:id", checkToken, async (req, res) => { //essa rota retorna os dados do usuário pesquisado
    const id = req.params.id
    //verifica se o usuário existe:
    const user = await Usuario.findById(id, '-password') //-password é para que a senha do usuário pesquisado não seja retornada, o -  é um filtro dos campos que não queremos retornar

    if(!user){
        return res.status(404).json({message: "Usuário não encontrado na pesquisa"})
    }else{
        res.status(200).json({user})
    }
})

//função para verificar o token

function checkToken(req, res, next){
    const authHeader = req.headers['authorization'] //o token vem pelo header, authorization é o token em si
    const token = authHeader && authHeader.split(" ")[1] //o token por padrão vem como: 'Bearer wekmwlqSw(string do token)', precisamos apenas do que vem após o Bearer, para isso confirmammos que o token veio com authHeader && e depois dividimos a string em 2 partes, o authHeader.split(" ")[0] é onde fica a string Bearer, e o authHeader.split(" ")[1] é o próprio token

    if(!token){
        return res.status(401).json({message: "Acesso negado"})
    }
    //caso tenha recebido o token, temos que validar se o token está correto
    try {
        const secret = process.env.SECRET //precisamos do secret para poder validar o token
        jwt.verify(token, secret) //passa o token recebido e o secret para a função verify do jwt
        next() //se a validação do token deu certo, deixo o usuário acessar a rota
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expirado. Faça login novamente." });
        } else {
            return res.status(400).json({ message: "Token inválido" });
        }

    }
}


// Conexão com o banco:

const DB_USER = encodeURIComponent(process.env.DB_USER);
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster-jwtudemy.nqmac.mongodb.net/bancoJwtUdemy?retryWrites=true&w=majority&appName=cluster-jwtUdemy`;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectamos ao MongoDB');
        server.listen(3000, () => console.log('Servidor rodando na porta 3000'));
    })
    .catch((err) => {
        console.error('Erro ao conectar ao MongoDB:', err);
    });
