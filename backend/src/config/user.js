import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

const Usuario = mongoose.model('User', User); //criando a tabela User e passado sua estrutura

export default Usuario;
