import { useRef, useState } from "react"
import { register } from "../services/service.module";
import { Link } from "react-router-dom";

export function Cadastro() {

    const [message, setMessage] = useState(""); // Estado para armazenar mensagens
    const [messageType, setMessageType] = useState("success"); // Define tipo de mensagem

    const inputRefName = useRef()
    const inputRefEmail = useRef()
    const inputRefPassword = useRef()
    const inputRefConfirmPassword = useRef()

    async function handleRegister() {
        try {
            const response = await register(inputRefName.current.value, inputRefEmail.current.value, inputRefPassword.current.value, inputRefConfirmPassword.current.value);
            setMessage(response.message || "Registrado com sucesso!");
            setMessageType("success");
        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }
        setTimeout(() => setMessage(""), 3000);
    }

    return (
        <div>
            {message && (
                <div className={`p-3 flex items-center justify-center rounded-tl-full rounded-tr-full ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {message}
                </div>
            )}
            <div className="flex flex-col bgColor2 !p-20 w-[600px] rounded">
                <h1 className="color1 !mb-10">CADASTRO</h1>
                <form className="flex flex-col">
                    <label className="!mb-2"><strong>Nome</strong></label>
                    <input className="!mb-5 !p-5" ref={inputRefName} type="text" placeholder="Nome" />

                    <label className="!mb-2"><strong>E-mail</strong></label>
                    <input className="!mb-5 !p-5" ref={inputRefEmail} type="text" placeholder="E-mail" />

                    <label className="!mb-2"><strong>Senha</strong></label>
                    <input className="!mb-5 !p-5" ref={inputRefPassword} type="password" placeholder="Senha" />

                    <label className="!mb-2"><strong>Confirmar senha</strong></label>
                    <input className="!p-5" ref={inputRefConfirmPassword} type="password" placeholder="Confirme sua senha" />
                    <button type="button"className="!p-3 cursor-pointer !mt-10 rounded bgColor1" onClick={handleRegister}><strong>Cadastrar</strong></button>

                    <Link to={'/'} className="text-center !mt-10 underline">Entrar</Link>
                </form>
            </div>

        </div>
    )
}