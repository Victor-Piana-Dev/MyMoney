import { useDispatch } from "react-redux"
import { removeCycle } from "../store/reducers/BillingCycle"
import { useRef, useState } from "react"
import { login } from "../services/service.module"
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo_my_money.webp'

export function Home() {

    const dispatch = useDispatch();


    const [message, setMessage] = useState(""); // Estado para armazenar mensagens
    const [messageType, setMessageType] = useState("success"); // Define tipo de mensagem

    const refEmail = useRef()
    const refSenha = useRef()

    const navigate = useNavigate();

    async function handleLogin() {
    
        try {
            const response = await login(refEmail.current.value, refSenha.current.value, dispatch);
            setMessage(response.message || "Logado com sucesso!");
            setMessageType("success");
            navigate('/dashboard');
        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }
        setTimeout(() => setMessage(""), 3000);
    }


    return (


        <div className="flex flex-col justify-center items-center">

            <img src={logo} alt="Logo My Money" className="w-[300px] rounded-full !mb-10" />

            {message && (
                <div className={`w-full p-3 flex items-center justify-center rounded-tl-full rounded-tr-full ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {message}
                </div>
            )}

            <div className="flex flex-col bgColor2 !p-20 w-[600px] rounded">

                <h1 className="color1 !mb-10">LOGIN</h1>
                <form className="flex flex-col">
                    <label className="!mb-2"><strong>E-mail</strong></label>
                    <input ref={refEmail} type="text" placeholder="E-mail" className="!mb-5 !p-5" />
                    <label className="!mb-2"><strong>Senha</strong></label>
                    <input ref={refSenha} type="password" placeholder="Senha" className="!p-5" />
                    <button type="button" className="!p-3 cursor-pointer !mt-10 rounded bgColor1" onClick={handleLogin}><strong>Entrar</strong></button>
                    <Link to={'/cadastro'} className="text-center !mt-10 underline">Cadastrar-se</Link>
                </form>
            </div>
        </div>


    )
}