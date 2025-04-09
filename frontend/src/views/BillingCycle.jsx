import { useState } from "react";
import {deleteBillingCycle, updateBillingCycle, useGetBillingCycles } from "../services/service.module";
import { ListTab } from "../components/ListTab";
import { IncludeTab } from "../components/IncludeTab";
import { ChangeTab } from "../components/ChangeTab";
import { useDispatch, useSelector } from "react-redux"
import { setActiveTab } from "../store/reducers/ActiveTabSlice";

export function BillingCycle() {

    const dispatch = useDispatch();

    const { billings, pegaBillingCycles } = useGetBillingCycles();

    const message = useSelector((state) => state.message.text);
    const messageType = useSelector((state) => state.messageType.type);

    const [guardaDadosParaAlterar, setGuardaDadosParaAlterar] = useState({
        id: "",
        name: "",
        month: 1,
        year: 1970,
        credits: [],
        debts: []
    })

    const mostrarListarIncluir = useSelector((state) => state.listarIncluir.mostrarListarIncluir);
    const activeTab = useSelector((state) => state.activeTab.activeTab)
    const mostrarAlterar = useSelector((state) => state.mostrarAlterar.mostrarAlterar)

    
    function handleTabClick(tab) {
        dispatch(setActiveTab(tab)) // Atualiza a aba ativa
    }


    async function handleOnClickAlterarBillingCycle() {

        try {
            // Chama a função para atualizar o ciclo de cobrança

            const response = await updateBillingCycle(guardaDadosParaAlterar.id, guardaDadosParaAlterar.name, guardaDadosParaAlterar.month, guardaDadosParaAlterar.year, guardaDadosParaAlterar.credits, guardaDadosParaAlterar.debts);

            dispatch(setMessage(response.message || "Adicionado com sucesso!"));
            dispatch(setMessageType("success"))

            pegaBillingCycles(); // Atualiza a lista após alteração

        } catch (errorMessage) {
            dispatch(setMessage(errorMessage));
            dispatch(setMessageType("error"))
        }
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => dispatch(setMessage("")), 5000); // Remover a mensagem após 5 segundos
    }


    async function handleOnClickExcluir(id) {
        try {
            const response = await deleteBillingCycle(id);

            dispatch(setMessage(response.message || "Excluído com sucesso!"));
            dispatch(setMessageType("success"))
            pegaBillingCycles(); // Atualiza a lista após exclusão
        } catch (errorMessage) {
            dispatch(setMessage(errorMessage));
            dispatch(setMessageType("error"))
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => dispatch(setMessage("")), 5000);
    }


    function handleRemoveCreditAlterar(index) {
        setGuardaDadosParaAlterar((prevData) => {
            if (prevData.credits.length > 1) {  // Garantir que há mais de um débito
                const updatedCredits = prevData.credits.filter((_, i) => i !== index);
                return { ...prevData, credits: updatedCredits };
            } else {
                dispatch(setMessage("Deve haver pelo menos 1 campo de crédito"));
                dispatch(setMessageType("error"))
                setTimeout(() => dispatch(setMessage("")), 5000);
                return prevData; // Retorna o estado atual sem modificar nada
            }
        });
    }


    function handleRemoveDebitAlterar(index) {
        setGuardaDadosParaAlterar((prevData) => {
            if (prevData.debts.length > 1) {  // Garantir que há mais de um débito
                const updatedDebts = prevData.debts.filter((_, i) => i !== index);
                return { ...prevData, debts: updatedDebts };
            } else {
                dispatch(setMessage("Deve haver pelo menos 1 campo de débito"));
                dispatch(setMessageType("error"))
                setTimeout(() => dispatch(setMessage("")), 5000);
                return prevData; // Retorna o estado atual sem modificar nada
            }
        });
    }


    function handleAddCreditAlterar() {
        setGuardaDadosParaAlterar((prevData) => ({
            ...prevData,
            credits: [...prevData.credits, { name: "", value: "" }] // Adiciona um novo crédito vazio
        }));
    }


    function handleAddDebitAlterar() {
        setGuardaDadosParaAlterar((prevData) => ({
            ...prevData,
            debts: [...prevData.debts, { name: "", value: "", status: "PENDENTE" }] // Adiciona um novo débito vazio
        }));
    }



    return (
        <div className="!p-10">

            {message && (
                <div className={`!p-3 !mb-4 rounded ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {message}
                </div>
            )}

            <div className="">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                    <li className={`me-2 ${mostrarListarIncluir ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'listar' ? "color1 bgColor4 !p-4 !ml-3" : "bgColor2 !ml-3 cursor-pointer"} inline-block !p-4 border-b-2 rounded-t-lg !w-[100px]`}
                            onClick={() => handleTabClick("listar")}
                            aria-selected={activeTab === "listar"}
                        >
                            Listar
                        </button>
                    </li>
                    <li className={`me-2 !ms-2 ${mostrarListarIncluir ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'incluir' ? "color1 bgColor4 !p-4 " : "bgColor2 !p-4 cursor-pointer"} inline-block p-4 border-b-2 rounded-t-lg !w-[100px]`}
                            onClick={() => handleTabClick("incluir")}
                            aria-selected={activeTab === "incluir"}
                        >
                            Incluir
                        </button>
                    </li>
                    <li className={`me-2 !ms-2 ${mostrarAlterar ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'alterar' ? "color1 bgColor4 !p-4 " : "bgColor2 !p-4 cursor-pointer"} inline-block p-4 border-b-2 rounded-t-lg !w-[100px]`}
                            onClick={() => handleTabClick("alterar")}
                            aria-selected={activeTab === "alterar"}
                        >
                            Alterar
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-tab-content">

                {/*Conteúdo Aba Listar */}
                <ListTab activeTab={activeTab} tab="listar" billings={billings} setGuardaDadosParaAlterar={setGuardaDadosParaAlterar} handleOnClickExcluir={handleOnClickExcluir}></ListTab>


                {/*Conteúdo Aba Incluir */}
                <IncludeTab activeTab={activeTab} tab="incluir"></IncludeTab>


                {/*Conteúdo Aba Alterar */}
                <ChangeTab activeTab={activeTab} tab="alterar" guardaDadosParaAlterar={guardaDadosParaAlterar} setGuardaDadosParaAlterar={setGuardaDadosParaAlterar} handleAddCreditAlterar={handleAddCreditAlterar} handleRemoveCreditAlterar={handleRemoveCreditAlterar} handleAddDebitAlterar={handleAddDebitAlterar} handleRemoveDebitAlterar={handleRemoveDebitAlterar} handleOnClickAlterarBillingCycle={handleOnClickAlterarBillingCycle}></ChangeTab>

            </div>
        </div>
    );
}