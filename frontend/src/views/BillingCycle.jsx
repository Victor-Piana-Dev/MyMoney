import { useRef, useState } from "react";
import { createBillingCycle, deleteBillingCycle, updateBillingCycle, useGetBillingCycles } from "../services/service.module";
import { ListTab } from "../components/ListTab";
import { IncludeTab } from "../components/IncludeTab";
import { ChangeTab } from "../components/ChangeTab";

export function BillingCycle() {
    const { billings, pegaBillingCycles } = useGetBillingCycles();

    const [message, setMessage] = useState(""); // Estado para armazenar mensagens
    const [messageType, setMessageType] = useState("success"); // Define tipo de mensagem
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [mostrarListarIncluir, setMostrarListarIncluir] = useState(true);
    const [activeTab, setActiveTab] = useState("listar"); // Estado para controlar a aba ativa
    const [creditName, setCreditName] = useState("");  // Estado para o nome do primeiro input do incluir name
    const [creditValue, setCreditValue] = useState(""); // Estado para para o value do primeiro input do incluir value
    const [creditsListState, setCreditsListState] = useState([]);   // Estado para manter os objetos dos demais inputs dos campos de inclusão
    const [debitName, setDebitName] = useState("");
    const [debitValue, setDebitValue] = useState("");
    const [debtsListState, setDebtsListState] = useState([]);
    const [debitStatusInit, setDebitStatusInit] = useState("PENDENTE");

    const [guardaDadosParaAlterar, setGuardaDadosParaAlterar] = useState({
        id: "",
        name: "",
        month: 1,
        year: 1970,
        credits: [],
        debts: []
    })

    const inputNameRef = useRef('');
    const inputMonthRef = useRef('');
    const inputYearRef = useRef('');

    function handleTabClick(tab) {
        setActiveTab(tab); // Atualiza a aba ativa
    }

    function handleOnClickAlterar() {
        setMostrarAlterar(true)
        setMostrarListarIncluir(false)
        setActiveTab('alterar')
    }

    // Função para adicionar um novo par de inputs para crédito
    function handleAddCredit() {
        // console.log(creditsListState)
        setCreditsListState([...creditsListState, { name: "", value: "" }]);
    }

    // Função para atualizar o valor de um crédito específico
    function handleCreditChange(index, field, value) {
        const updatedCredits = [...creditsListState];
        updatedCredits[index] = { ...updatedCredits[index], [field]: value };
        setCreditsListState(updatedCredits);
    }

    // Função para adicionar um novo par de inputs para débito
    function handleAddDebit() {
        setDebtsListState([...debtsListState, { name: "", value: "", status: "PENDENTE" }]);
    }

    // Função para atualizar o valor de um débito específico
    function handleDebtChange(index, field, value) {
        const updatedDebts = [...debtsListState];
        updatedDebts[index] = { ...updatedDebts[index], [field]: value };
        setDebtsListState(updatedDebts);
    }

    async function handleOnClickIncluir() {
        const name = inputNameRef.current.value;
        const month = inputMonthRef.current.value;
        const year = inputYearRef.current.value;

        try {
            const credits = [
                { name: creditName, value: creditValue },
                ...creditsListState.map(credit => ({ name: credit.name, value: credit.value }))
            ];
            const debts = [
                { name: debitName, value: debitValue, status: debitStatusInit },
                ...debtsListState.map(debit => ({ name: debit.name, value: debit.value, status: debit.status }))
            ];
            console.log(debts)

            const response = await createBillingCycle(name, month, year, credits, debts);
            setMessage(response.message || "Adicionado com sucesso!");
            setMessageType("success"); // Mensagem positiva

            pegaBillingCycles(); // Atualiza a lista após inclusão

            // Limpar os inputs
            inputNameRef.current.value = "";
            inputMonthRef.current.value = "";
            inputYearRef.current.value = "";

            setCreditName("")
            setCreditValue("")
            setCreditsListState([]);

            setDebitName("")
            setDebitValue("")
            setDebtsListState([]);

        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => setMessage(""), 5000); // Remover a mensagem após 5 segundos
    }



    async function handleOnClickAlterarBillingCycle() {

        try {
            // Chama a função para atualizar o ciclo de cobrança

            const response = await updateBillingCycle(guardaDadosParaAlterar.id, guardaDadosParaAlterar.name, guardaDadosParaAlterar.month, guardaDadosParaAlterar.year, guardaDadosParaAlterar.credits, guardaDadosParaAlterar.debts);
            setMessage(response.message || "Alterado com sucesso!");
            setMessageType("success"); // Mensagem de sucesso

            pegaBillingCycles(); // Atualiza a lista após alteração

        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => setMessage(""), 5000); // Remover a mensagem após 5 segundos
    }


    async function handleOnClickExcluir(id) {
        try {
            const response = await deleteBillingCycle(id);
            setMessage(response.message || "Excluído com sucesso!");
            setMessageType("success");
            pegaBillingCycles(); // Atualiza a lista após exclusão
        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => setMessage(""), 5000);
    }

    function handleRemoveCreditIncluir(index) {
        setCreditsListState(function (prevCredits) {
            return prevCredits.filter(function (_, i) {
                return i !== index;
            });
        });
    }

    function handleRemoveDebitIncluir(index) {
        setDebtsListState(function (prevDebts) {
            return prevDebts.filter(function (_, i) {
                return i !== index;
            });
        });
    }


    function handleRemoveCreditAlterar(index) {
        setGuardaDadosParaAlterar((prevData) => {
            if (prevData.credits.length > 1) {  // Garantir que há mais de um débito
                const updatedCredits = prevData.credits.filter((_, i) => i !== index);
                return { ...prevData, credits: updatedCredits };
            } else {
                setMessage("Deve haver pelo menos 1 campo de crédito");
                setMessageType("error"); // Define o tipo da mensagem
                setTimeout(() => setMessage(""), 5000);
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
                setMessage("Deve haver pelo menos 1 campo de débito");
                setMessageType("error"); // Define o tipo da mensagem
                setTimeout(() => setMessage(""), 5000);
                return prevData; // Retorna o estado atual sem modificar nada
            }
        });
    }

    function handleVoltar() {
        setMostrarAlterar(false)
        setMostrarListarIncluir(true)
        setActiveTab('listar')
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
                <ListTab activeTab={activeTab} tab="listar" billings={billings} handleOnClickAlterar={handleOnClickAlterar} setGuardaDadosParaAlterar={setGuardaDadosParaAlterar} handleOnClickExcluir={handleOnClickExcluir}></ListTab>


                {/*Conteúdo Aba Incluir */}
                <IncludeTab activeTab={activeTab} tab="incluir" inputNameRef={inputNameRef} inputMonthRef={inputMonthRef} inputYearRef={inputYearRef} creditName={creditName} creditValue={creditValue} setCreditName={setCreditName} setCreditValue={setCreditValue} handleAddCredit={handleAddCredit} creditsListState={creditsListState} handleCreditChange={handleCreditChange} handleRemoveCreditIncluir={handleRemoveCreditIncluir} debitName={debitName} setDebitName={setDebitName} debitStatusInit={debitStatusInit} setDebitValue={setDebitValue} setDebitStatusInit={setDebitStatusInit} handleAddDebit={handleAddDebit} debtsListState={debtsListState} handleDebtChange={handleDebtChange} handleRemoveDebitIncluir={handleRemoveDebitIncluir} handleOnClickIncluir={handleOnClickIncluir} debitValue={debitValue}></IncludeTab>


                {/*Conteúdo Aba Alterar */}
                <ChangeTab activeTab={activeTab} tab="alterar" guardaDadosParaAlterar={guardaDadosParaAlterar} setGuardaDadosParaAlterar={setGuardaDadosParaAlterar} handleAddCreditAlterar={handleAddCreditAlterar} handleRemoveCreditAlterar={handleRemoveCreditAlterar} handleAddDebitAlterar={handleAddDebitAlterar} handleRemoveDebitAlterar={handleRemoveDebitAlterar} handleVoltar={handleVoltar} handleOnClickAlterarBillingCycle={handleOnClickAlterarBillingCycle}></ChangeTab>

            </div>
        </div>
    );
}