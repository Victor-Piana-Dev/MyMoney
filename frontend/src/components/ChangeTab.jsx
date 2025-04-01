import { ValueBoxGroup } from "./ValueBoxGroup";

export function ChangeTab({activeTab, tab, guardaDadosParaAlterar, setGuardaDadosParaAlterar, handleAddCreditAlterar, handleRemoveCreditAlterar, handleAddDebitAlterar, handleRemoveDebitAlterar, handleVoltar, handleOnClickAlterarBillingCycle}) {
    

    let totalCreditValueAlterar = 0
    let totalDebitValueAlterar = 0

    return (
        <>
            {/* Aba Alterar */}
            {activeTab === tab && (
                <div className="!p-5 rounded-lg bgColor2 dark:bg-gray-800">
                    <h3 className="!mb-15 color1 text-center">Altere os dados!</h3>
    
                    <form>
                        <div className="flex flex-col">
                            <label>Nome do ciclo de pagamento: </label>
                            <input
                                type="text"
                                placeholder="Nome do ciclo ( ex: Ciclo Janeiro de 25 )"
                                value={guardaDadosParaAlterar.name} // O valor do input vem do estado
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    name: e.target.value // Atualiza o estado quando o valor mudar
                                })}
                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                            />
                            <label>Mês:</label>
                            <input
                                type="text"
                                placeholder="Mês ( ex: Janeiro )"
                                value={guardaDadosParaAlterar.month}
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    month: e.target.value
                                })}
                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                            />
                            <label>Ano:</label>
                            <input
                                type="text"
                                placeholder="Ano ( ex: 2025 )"
                                value={guardaDadosParaAlterar.year}
                                onChange={(e) => setGuardaDadosParaAlterar({
                                    ...guardaDadosParaAlterar,
                                    year: e.target.value
                                })}
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
                                        setGuardaDadosParaAlterar({
                                            ...guardaDadosParaAlterar,
                                            credits: updatedCredits,
                                        });
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Valor do crédito (ex: 2590)"
                                    value={credit.value}
                                    onChange={(e) => {
                                        const updatedCredits = [...guardaDadosParaAlterar.credits];
                                        updatedCredits[index] = { ...updatedCredits[index], value: e.target.value };
                                        setGuardaDadosParaAlterar({
                                            ...guardaDadosParaAlterar,
                                            credits: updatedCredits,
                                        });
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
                                        updatedDebts[index] = { ...updatedDebts[index], name: e.target.value };
                                        setGuardaDadosParaAlterar({
                                            ...guardaDadosParaAlterar,
                                            debts: updatedDebts,
                                        });
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3"
                                />

                                <input
                                    type="number"
                                    placeholder="Valor do débito"
                                    value={debt.value}
                                    onChange={(e) => {
                                        const updatedDebts = [...guardaDadosParaAlterar.debts];
                                        updatedDebts[index] = { ...updatedDebts[index], value: e.target.value };
                                        setGuardaDadosParaAlterar({
                                            ...guardaDadosParaAlterar,
                                            debts: updatedDebts,
                                        });
                                    }}
                                    className="!p-3 !w-[30%] !h-[50px] !mb-3 !ml-3"
                                />

                                <select
                                    value={debt.status}  // Estado para armazenar o status do débito
                                    onChange={(e) => {
                                        const updatedDebts = [...guardaDadosParaAlterar.debts];
                                        updatedDebts[index] = { ...updatedDebts[index], status: e.target.value };
                                        setGuardaDadosParaAlterar({
                                            ...guardaDadosParaAlterar,
                                            debts: updatedDebts,
                                        });
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
                        <button className="!p-4 bgColor3 text-white !mt-10 !ml-4 cursor-pointer rounded" onClick={handleVoltar}>Voltar para a listagem</button>

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