import { useDispatch, useSelector } from "react-redux";
import { useHandleBack } from "../hooks/useHandleBack";
import { updateBillingCycle, useGetBillingCycles } from "../services/service.module";
import { setMessage } from "../store/reducers/MessageSlice";
import { setMessageType } from "../store/reducers/MessageTypeSlice";
import { ValueBoxGroup } from "./ValueBoxGroup";
import { setDataCycle } from "../store/reducers/GlobalDataChangeTabSlice";


export function ChangeTab({ activeTab, tab }) {


    let totalCreditValueAlterar = 0
    let totalDebitValueAlterar = 0

    const handleBack = useHandleBack()

    const dispatch = useDispatch();

    const { billings, pegaBillingCycles } = useGetBillingCycles();

    const guardaDadosParaAlterar = useSelector(state => state.globalDataChange);


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


    function handleRemoveCreditAlterar(index) {

        if (guardaDadosParaAlterar.credits.length > 1) {
            const updatedCredits = guardaDadosParaAlterar.credits.filter((_, i) => i !== index);
            dispatch(setDataCycle({ credits: updatedCredits }));
        } else {
            dispatch(setMessage("Deve haver pelo menos 1 campo de crédito"));
            dispatch(setMessageType("error"));
            setTimeout(() => dispatch(setMessage("")), 5000);
        }
    }

    
    function handleRemoveDebitAlterar(index) {


        if (guardaDadosParaAlterar.debts.length > 1) {
            const updatedDebts = guardaDadosParaAlterar.debts.filter((_, i) => i !== index);
            dispatch(setDataCycle({ debts: updatedDebts }));
        } else {
            dispatch(setMessage("Deve haver pelo menos 1 campo de débito"));
            dispatch(setMessageType("error"));
            setTimeout(() => dispatch(setMessage("")), 5000);
        }
    }


    function handleAddCreditAlterar() {

        const updatedCredits = [...guardaDadosParaAlterar.credits, { name: "", value: "" }];
        dispatch(setDataCycle({ credits: updatedCredits }));

    }


    function handleAddDebitAlterar() {
        const updatedDebits = [...guardaDadosParaAlterar.debts, { name: "", value: "", status: "PENDENTE" }];
        dispatch(setDataCycle({ debts: updatedDebits }));
    }

    return (
        <>
            {/* Aba Alterar */}
            {activeTab === tab && (
                <div className="!p-5 rounded-lg bgColor2 dark:bg-gray-800">
                    <h3 className="!mb-15 color1 text-center">Altere os dados!</h3>

                    <form>
                        <div className="flex flex-col">
                            <label>Nome do ciclo de pagamento: </label>
                            {console.log('guardaDadosParaAlterar', guardaDadosParaAlterar)}
                            <input
                                type="text"
                                placeholder="Nome do ciclo ( ex: Ciclo Janeiro de 25 )"
                                value={guardaDadosParaAlterar.name} // O valor do input vem do estado
                                onChange={(e) => dispatch(setDataCycle({ name: e.target.value }))}
                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                            />
                            <label>Mês:</label>
                            <input
                                type="text"
                                placeholder="Mês ( ex: Janeiro )"
                                value={guardaDadosParaAlterar.month}
                                onChange={(e) => dispatch(setDataCycle({ month: e.target.value }))}
                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                            />
                            <label>Ano:</label>
                            <input
                                type="text"
                                placeholder="Ano ( ex: 2025 )"
                                value={guardaDadosParaAlterar.year}
                                onChange={(e) => dispatch(setDataCycle({ year: e.target.value }))}
                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                            />
                        </div>

                        <div className="flex items-center !mb-5 !mt-5">
                            <h4>Créditos</h4>
                            <button type="button" className="cursor-pointer !p-2 bgColor1 text-white !max-w-[200px]  !ml-[40px] rounded" onClick={handleAddCreditAlterar}>Adicionar</button>
                        </div>
                        {guardaDadosParaAlterar.credits.map((credit, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Nome do crédito (ex: Salário)"
                                    value={credit.name}
                                    onChange={(e) => {
                                        const updatedCredits = [...guardaDadosParaAlterar.credits];
                                        updatedCredits[index] = { ...updatedCredits[index], name: e.target.value };
                                    
                                        dispatch(setDataCycle({ credits: updatedCredits }));
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Valor do crédito (ex: 2590)"
                                    value={credit.value}
                                    onChange={(e) => {
                                        const updatedCredits = [...guardaDadosParaAlterar.credits];
                                        updatedCredits[index] = {
                                            ...updatedCredits[index],
                                            value: e.target.value
                                        };
                                    
                                        dispatch(setDataCycle({ credits: updatedCredits }));
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3 !ml-3"
                                />

                                <button type="button" className="cursor-pointer !p-4 bgColor3 !max-w-[200px]  !ml-[40px] rounded" onClick={() => handleRemoveCreditAlterar(index)}>Remover</button>
                            </div>
                        ))}

                        <div className="flex items-center !mb-5 !mt-5">
                            <h4>Débitos</h4>
                            <button type="button" className="cursor-pointer !p-2 bgColor1 text-white !max-w-[200px]  !ml-[40px] rounded" onClick={handleAddDebitAlterar}>Adicionar</button>
                        </div>

                        {guardaDadosParaAlterar.debts.map((debt, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder="Nome do Débito ( ex: Conta de luz )"
                                    value={debt.name}
                                    onChange={(e) => {
                                        const updatedDebts = [...guardaDadosParaAlterar.debts];
                                        updatedDebts[index] = {
                                            ...updatedDebts[index],
                                            name: e.target.value
                                        };
                                    
                                        dispatch(setDataCycle({ debts: updatedDebts }));
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Valor do débito"
                                    value={debt.value}
                                    onChange={(e) => {
                                        const updatedDebts = [...guardaDadosParaAlterar.debts];
                                        updatedDebts[index] = {
                                            ...updatedDebts[index],
                                            value: e.target.value
                                        };
                                    
                                        dispatch(setDataCycle({ debts: updatedDebts }));
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3 !ml-3"
                                />

                                <select
                                    value={debt.status}  // Estado para armazenar o status do débito
                                    onChange={(e) => {
                                        const updatedDebts = [...guardaDadosParaAlterar.debts];
                                        updatedDebts[index] = {
                                            ...updatedDebts[index],
                                            status: e.target.value
                                        };
                                    
                                        dispatch(setDataCycle({ debts: updatedDebts }));
                                    }}
                                    className="!p-2 border rounded w-52 !ml-[10px]"
                                >
                                    <option value="PAGO">PAGO</option>
                                    <option value="PENDENTE">PENDENTE</option>
                                </select>

                                <button type="button" className="cursor-pointer !p-4 bgColor3 !max-w-[200px]  !ml-[40px] rounded" onClick={() => handleRemoveDebitAlterar(index)}>Remover</button>
                            </div>
                        ))}



                        <button
                            className="!p-4 bgColor1 text-white !mt-10 cursor-pointer rounded"
                            type="button"
                            onClick={handleOnClickAlterarBillingCycle} // Usando a função de alteração
                        >
                            Alterar e Salvar
                        </button>
                        <button className="!p-4 bgColor3 text-white !mt-10 !ml-4 cursor-pointer rounded" onClick={handleBack}>Voltar para a listagem</button>

                        <div className="!mt-20">

                            {guardaDadosParaAlterar.credits.map((credit) => {
                                totalCreditValueAlterar += Number(credit.value)
                            })}

                            {guardaDadosParaAlterar.debts.map((debit) => {
                                totalDebitValueAlterar += Number(debit.value)
                            })}

                            <ValueBoxGroup totalCredits={totalCreditValueAlterar} totalDebts={totalDebitValueAlterar}></ValueBoxGroup>

                        </div>

                    </form>
                </div>
            )}
        </>
    )
}