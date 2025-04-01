import { useEffect, useState } from "react";
import api from "./api";
import { setUser } from '../store/reducers/userSlice';


export function useGetSummary() {
    const [summary, setSummary] = useState([]);

    async function pegaSummary() {
        const response = await api.get("/api/billingCycles/summary");
        console.log(1, response)
        setSummary(response.data);
        console.log(2, response.data)
        console.log(4, response.message)
    }

    useEffect(() => {
        pegaSummary();
    }, []);

    return { summary, pegaSummary };
}



export function useGetBillingCycles() {
    const [billings, setBillings] = useState([]);

    async function pegaBillingCycles() {
        const response = await api.get("/api/billingCycles");
        
        setBillings(response.data);
    }

    useEffect(() => {
        pegaBillingCycles();
    }, []);

    return { billings, pegaBillingCycles };
}



export async function createBillingCycle(name, month, year, credits, debts) {
    try {
        const novoObjeto = { name, month, year, credits, debts};
        const response = await api.post('/api/billingCycles', novoObjeto);

        return response.data; // Retorna a resposta do backend (com a mensagem)
    } catch (error) {
        // Captura erros e retorna a mensagem correta do backend, se o backend retornar uma mensagem de erro (error.response?.data?.message ou error.response?.data?.errors?.join(", ")), essa mensagem será lançada. Caso contrário, o erro padrão "Erro ao adicionar ciclo!" é lançado.
        throw error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "Erro ao adicionar ciclo!";
    }
}



export async function updateBillingCycle(id, name, month, year, credits, debts) {
    try {
        // Certificando-se de que o id está sendo passado corretamente

        const updatedData = { id, name, month, year, credits, debts };

        // Enviando a requisição PUT com os dados corretos no corpo
        const response = await api.put(`/api/billingCycles/`, updatedData);

        return response.data; // Retorna a resposta do backend (com a mensagem de sucesso ou os dados atualizados)
    } catch (error) {
        // Captura erros e retorna a mensagem correta do backend, se o backend retornar uma mensagem de erro (error.response?.data?.message ou error.response?.data?.errors?.join(", ")), essa mensagem será lançada. Caso contrário, o erro padrão "Erro ao adicionar ciclo!" é lançado.
        throw error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "Erro ao atualizar o ciclo!";
    }
}

export async function deleteBillingCycle(id) {
    try {
        const response = await api.delete(`/api/billingCycles/`, {
            data: { id } // Enviando o ID no corpo da requisição
        });

        return response.data; // Retorna a resposta do backend (se necessário)
    } catch (error) {
        throw error.response?.data?.message || "Erro ao deletar o ciclo!";
    }
}


export async function login(email, password, dispatch) {

    try {
        const novoObjeto = { email, password };
        const response = await api.post('/auth/login', novoObjeto);

        console.log('Verificacao response.data.user: ', response.data.user)
        dispatch(setUser({ user: response.data.user, token: response.data.token }));
        // Armazenar o token no localStorage(O localStorage pode ser substituído por sessionStorage se você preferir que o token expire ao fechar o navegador.)
        localStorage.setItem('token', response.data.token); // Primeiro parâmetro 'token' é o nome da chave sob a qual o valor será armazenado no armazenamento local (localStorage), o nome dessa chave pode ser qualquer string que você escolher, mas o valor da chave deve ser o token em si(segundo parâmetro), que vem da resposta do backend(response.data.token). O 'token'(primeiro parâmetro) é o nome da chave no localStorage, que pode ser qualquer outro nome, como 'authToken', 'jwtToken', 'userToken', é apenas o nome que vai ser salvo no localstorage
        // console.log('response.data.token', response.data.token)
        return response.data; // Retorna a resposta do backend (com a mensagem ou token)
    } catch (error) {
        // Captura erros e retorna a mensagem correta do backend
        throw error.response?.data?.message ||
            error.response?.data?.errors?.join(", ") ||
            "Erro ao realizar o login";
    }
}


export async function register(name, email, password, confirmpassword){
    try {
        const novoObjeto = { name, email, password, confirmpassword };
        const response = await api.post('/auth/register', novoObjeto);
        

        return response.data; // Retorna a resposta do backend (com a mensagem)
    } catch (error) {
        // Captura erros e retorna a mensagem correta do backend, se o backend retornar uma mensagem de erro (error.response?.data?.message ou error.response?.data?.errors?.join(", ")), essa mensagem será lançada. Caso contrário, o erro padrão "Erro ao adicionar ciclo!" é lançado.
        throw error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "Erro ao realizar o cadastro";
    }
}
