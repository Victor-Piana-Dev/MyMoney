//billingCycle.jsx:

import { useRef, useState } from "react";
import { createBillingCycle, deleteBillingCycle, updateBillingCycle, useGetBillingCycles } from "../services/service.module";
import { CreditList } from "../components/CreditList";
import { DebtList } from "../components/DebtList";

export function BillingCycle() {
    const { billings, pegaBillingCycles } = useGetBillingCycles();

    const [message, setMessage] = useState(""); // Estado para armazenar mensagens
    const [messageType, setMessageType] = useState("success"); // Define tipo de mensagem
    const [mostrarAlterar, setMostrarAlterar] = useState(false);
    const [mostrarListarIncluir, setMostrarListarIncluir] = useState(true);

    const [activeTab, setActiveTab] = useState("listar"); // Estado para controlar a aba ativa

    const [creditsListState, setCreditsListState] = useState([]);   // Estado para manter a lista de componentes CreditList

    const [guardaDadosParaAlterar, setGuardaDadosParaAlterar] = useState({
        id: "",
        name: "",
        month: 1,
        year: 1970,
        credits: [],
        debts: []
    })

    console.log(3, billings);

    const inputNameRef = useRef('');
    const inputMonthRef = useRef('');
    const inputYearRef = useRef('');
    
    const inputNameCreditRef = useRef('')
    const inputValueCreditRef = useRef('')
    const inputNameCreditRef2 = useRef('')
    const inputValueCreditRef2 = useRef('')

    const inputNameDebtRef = useRef('')
    const inputValueDebtRef = useRef('')


    async function handleOnClickIncluir() {
        const name = inputNameRef.current.value;
        const month = inputMonthRef.current.value;
        const year = inputYearRef.current.value;

        const creditName = inputNameCreditRef.current.value;
        const creditValue = inputValueCreditRef.current.value;
        const creditName2 = inputNameCreditRef2.current.value;
        const creditValue2 = inputValueCreditRef2.current.value;

        const debtName = inputNameDebtRef.current.value;
        const debtValue = inputValueDebtRef.current.value;

        try {
            const credits = [{ name: creditName, value: creditValue }, {name: creditName2, value: creditValue2}]
            const debts = { name: debtName, value: debtValue }
            const response = await createBillingCycle(name, month, year, credits, debts);
            setMessage(response.message || "Adicionado com sucesso!");
            setMessageType("success"); // Mensagem positiva

            pegaBillingCycles(); // Atualiza a lista após inclusão

            // Limpar os inputs
            inputNameRef.current.value = "";
            inputMonthRef.current.value = "";
            inputYearRef.current.value = "";

            inputNameCreditRef.current.value = ""
            inputValueCreditRef.current.value = ""
            inputNameCreditRef2.current.value = ""
            inputValueCreditRef2.current.value = ""

            inputNameDebtRef.current.value = ""
            inputValueDebtRef.current.value = ""

        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }

        setTimeout(() => setMessage(""), 3000); // Remover a mensagem após 3 segundos
    }

    function handleTabClick(tab) {
        setActiveTab(tab); // Atualiza a aba ativa
    }

    function handleOnClickAlterar() {
        setMostrarAlterar(true)
        setMostrarListarIncluir(false)
        setActiveTab('alterar')
    }

    function handleAddCredit() {
        
        setCreditsListState(prevCredits => [
            ...prevCredits,
            <CreditList
                key={prevCredits.length}  // Garantir que o componente tenha uma chave única
                inputNameCreditRef={inputNameCreditRef}
                inputValueCreditRef={inputValueCreditRef}
            />
        ]);
    }

    async function handleOnClickAlterarBillingCycle() {
        // console.log('id: ', guardaDadosParaAlterar.id)
        // console.log('name: ', guardaDadosParaAlterar.name)
        // console.log('month: ', guardaDadosParaAlterar.month)
        // console.log('year: ', guardaDadosParaAlterar.year)
        // console.log('credits: ', guardaDadosParaAlterar.credits)
        // console.log('debts: ', guardaDadosParaAlterar.debts)
        try {
            // Chama a função para atualizar o ciclo de cobrança

            const response = await updateBillingCycle(guardaDadosParaAlterar.id, guardaDadosParaAlterar.name, guardaDadosParaAlterar.month, guardaDadosParaAlterar.year, guardaDadosParaAlterar.credits, guardaDadosParaAlterar.debts);

            setMessage(response.message || "Alterado com sucesso!");
            setMessageType("success"); // Mensagem de sucesso

            pegaBillingCycles(); // Atualiza a lista após alteração

            // Limpar os inputs após a atualização
            // setGuardaDadosParaAlterar({ name: "", month: 1, year: 1970 });

        } catch (errorMessage) {
            setMessage(errorMessage);
            setMessageType("error"); // Mensagem de erro
        }

        setTimeout(() => setMessage(""), 3000); // Remover a mensagem após 3 segundos
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
        setTimeout(() => setMessage(""), 3000);
    }


    return (
        <>
            <h1>Billing Cycle</h1>

            {/* Exibição da mensagem */}
            {message && (
                <div className={`p-3 mb-4 rounded ${messageType === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
                    {message}
                </div>
            )}

            <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
                <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                    <li className={`me-2 ${mostrarListarIncluir ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'listar' ? "text-blue-600" : ""} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}
                            onClick={() => handleTabClick("listar")}
                            aria-selected={activeTab === "listar"}
                        >
                            Listar
                        </button>
                    </li>
                    <li className={`me-2 ${mostrarListarIncluir ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'incluir' ? "text-blue-600" : ""} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}
                            onClick={() => handleTabClick("incluir")}
                            aria-selected={activeTab === "incluir"}
                        >
                            Incluir
                        </button>
                    </li>
                    <li className={`me-2 ${mostrarAlterar ? "" : "hidden"}`} role="presentation">
                        <button
                            className={`${activeTab === 'alterar' ? "text-blue-600" : ""} cursor-pointer inline-block p-4 border-b-2 rounded-t-lg`}
                            onClick={() => handleTabClick("alterar")}
                            aria-selected={activeTab === "alterar"}
                        >
                            Alterar
                        </button>
                    </li>
                </ul>
            </div>

            <div id="default-tab-content">
                {/* Aba Listar */}
                {activeTab === "listar" && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Mês
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Ano
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {billings.map((billing) => (
                                        <tr key={billing._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {billing.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {billing.month}
                                            </td>
                                            <td className="px-6 py-4">
                                                {billing.year}
                                            </td>
                                            <td className="px-6 py-4"> {/* A célula onde o botão será colocado */}
                                                <button
                                                    className="bg-amber-500 !p-4 !mt-2 !mb-2 rounded cursor-pointer"
                                                    onClick={() => {
                                                        handleOnClickAlterar();
                                                        setGuardaDadosParaAlterar({ id: billing._id, name: billing.name, month: billing.month, year: billing.year, credits: billing.credits, debts: billing.debts });
                                                    }}
                                                >
                                                    Alterar
                                                </button>
                                            </td>
                                            <td className="px-6 py-4"> {/* A célula onde o botão será colocado */}
                                                <button className="bg-red-500 text-white !p-4 !mt-2 !mb-2 rounded cursor-pointer" onClick={() => handleOnClickExcluir(billing._id)}>
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Aba Incluir */}
                {activeTab === "incluir" && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        <form>
                            <input ref={inputNameRef} type="text" placeholder="Nome" />
                            <input ref={inputMonthRef} type="text" placeholder="Mês" />
                            <input ref={inputYearRef} type="text" placeholder="Ano" />
                        </form>
                        <div>
                            <div className="flex">
                                <CreditList inputNameCreditRef={inputNameCreditRef} inputValueCreditRef={inputValueCreditRef}></CreditList>
                                <CreditList inputNameCreditRef={inputNameCreditRef2} inputValueCreditRef={inputValueCreditRef2}></CreditList>
                                 <button className="cursor-pointer p-2 bg-green-500" onClick={handleAddCredit}>Adicionar Crédito</button>
                            </div>
                            
                            <div>
                                <div>
                                    {creditsListState}
                                </div>
                            </div>
                        </div>
                        <DebtList inputNameDebtRef={inputNameDebtRef} inputValueDebtRef={inputValueDebtRef}></DebtList>
                        <button className="!p-4 bg-amber-500 !mt-4 cursor-pointer" type="button" onClick={handleOnClickIncluir}>
                            Incluir
                        </button>
                    </div>
                )}

                {/* Aba Alterar */}
                {activeTab === "alterar" && (
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
                        {/* Inputs para alterar */}
                        <form>
                            <input
                                type="text"
                                placeholder="Nome"
                                value={guardaDadosParaAlterar.name} // O valor do input vem do estado
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    name: e.target.value // Atualiza o estado quando o valor mudar
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Mês"
                                value={guardaDadosParaAlterar.month} // O valor do input vem do estado
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    month: e.target.value // Atualiza o estado quando o valor mudar
                                })}
                            />
                            <input
                                type="text"
                                placeholder="Ano"
                                value={guardaDadosParaAlterar.year} // O valor do input vem do estado
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    year: e.target.value // Atualiza o estado quando o valor mudar
                                })}
                            />
                            {console.log('teste', guardaDadosParaAlterar.credits[0].name)}
                            <h1>Créditos</h1>
                            {guardaDadosParaAlterar.credits.map((credit, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Name Credit"
                                        value={credit.name}
                                        onChange={(e) => {
                                            const updatedCredits = [...guardaDadosParaAlterar.credits];
                                            updatedCredits[index] = { ...updatedCredits[index], name: e.target.value };
                                            setGuardaDadosParaAlterar({
                                                ...guardaDadosParaAlterar,
                                                credits: updatedCredits,
                                            });
                                        }}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Value Credit"
                                        value={credit.value}
                                        onChange={(e) => {
                                            const updatedCredits = [...guardaDadosParaAlterar.credits];
                                            updatedCredits[index] = { ...updatedCredits[index], value: e.target.value };
                                            setGuardaDadosParaAlterar({
                                                ...guardaDadosParaAlterar,
                                                credits: updatedCredits,
                                            });
                                        }}
                                    />
                                </div>
                            ))}

                            <h1>Débitos</h1>

                            {guardaDadosParaAlterar.debts.map((debt, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        placeholder="Name Debt"
                                        value={debt.name}
                                        onChange={(e) => {
                                            const updatedDebts = [...guardaDadosParaAlterar.debts];
                                            updatedDebts[index] = { ...updatedDebts[index], name: e.target.value };
                                            setGuardaDadosParaAlterar({
                                                ...guardaDadosParaAlterar,
                                                debts: updatedDebts,
                                            });
                                        }}
                                    />

                                    <input
                                        type="number"
                                        placeholder="Value Debt"
                                        value={debt.value}
                                        onChange={(e) => {
                                            const updatedDebts = [...guardaDadosParaAlterar.debts];
                                            updatedDebts[index] = { ...updatedDebts[index], value: e.target.value };
                                            setGuardaDadosParaAlterar({
                                                ...guardaDadosParaAlterar,
                                                debts: updatedDebts,
                                            });
                                        }}
                                    />
                                </div>
                            ))}




                            {/* <CreditList
                                value={guardaDadosParaAlterar.credits}
                                handleChange={(updatedCredits) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    credits: updatedCredits // Atualiza a lista inteira de créditos
                                })}
                            /> */}


                            <button
                                className="!p-4 bg-amber-500 !ml-3 cursor-pointer"
                                type="button"
                                onClick={handleOnClickAlterarBillingCycle} // Usando a função de alteração
                            >
                                Alterar
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}