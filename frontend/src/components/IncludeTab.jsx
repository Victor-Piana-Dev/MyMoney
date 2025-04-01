import { ValueBoxGroup } from "./ValueBoxGroup"

export function IncludeTab({activeTab, tab, inputNameRef, inputMonthRef, inputYearRef, creditName, creditValue, setCreditName, setCreditValue, handleAddCredit, creditsListState, handleCreditChange, handleRemoveCreditIncluir, setDebitName, debitStatusInit, setDebitValue, setDebitStatusInit, handleAddDebit, debtsListState, handleDebtChange, handleRemoveDebitIncluir, handleOnClickIncluir, debitName, debitValue}) {
    
    let debitValueNumber = 0
    let creditValueNumber = 0
    
    return (
        <>
            {/* Aba Incluir */}
            {activeTab === tab && (
                <div className="!p-5 rounded-lg bgColor2 dark:bg-gray-800">
                    <h3 className="!mb-15 color1 text-center">Organize seu dinheiro!</h3>
                    <div>

                        <form className="!mb-5 !mr-15 flex flex-col">
                            <h3></h3>
                            <label>Nome do ciclo de pagamento: </label>
                            <input ref={inputNameRef} type="text" placeholder="Nome do ciclo ( ex: Ciclo Janeiro de 25 )" className=" !p-3 !mb-3 !w-[40%]" />
                            <label>Mês:</label>
                            <input ref={inputMonthRef} type="text" placeholder="Mês ( ex: Janeiro )" className=" !p-3 !mb-3 !w-[40%]" />
                            <label>Ano:</label>
                            <input ref={inputYearRef} type="text" placeholder="Ano ( ex: 2025 )" className=" !p-3 !mb-3 !w-[40%]" />
                        </form>

                        <div className="!mb-15">

                            <div> {/*Parte dos créditos*/}
                                <h4 className="color1 !mb-4">Organize seus créditos:</h4>
                                <div className="flex items-center">
                                    <form className="flex items-center w-full">

                                        <input
                                            type="text"
                                            value={creditName}  // O valor do input é controlado pelo estado
                                            onChange={e => setCreditName(e.target.value)} // Atualiza o estado com o valor do input
                                            placeholder="Nome do Crédito (ex: Salário)"
                                            className="!p-3 !w-[30%] !h-[50px]"
                                        />

                                        <input
                                            type="text"
                                            value={creditValue}
                                            onChange={e => setCreditValue(e.target.value)}
                                            placeholder="Valor do Crédito (ex: 2590)"
                                            className="!p-3 !w-[30%] !ml-[10px] !h-[50px]"
                                        />

                                        <button type="button" className="cursor-pointer !p-4 bgColor1 text-white !max-w-[200px]  !ml-[40px] rounded" onClick={handleAddCredit}>Adicionar Crédito</button>
                                    </form>

                                </div>

                                {/* Renderizando os pares de inputs de crédito */}
                                <div>
                                    {creditsListState.map((credit, index) => (
                                        <div key={index} className="!mt-5">
                                            <input
                                                type="text"
                                                value={credit.name}
                                                onChange={(e) => handleCreditChange(index, "name", e.target.value)}
                                                placeholder="Nome do crédito"
                                                className="!p-3 !w-[30%] !h-[50px]"
                                            />
                                            <input
                                                type="text"
                                                value={credit.value}
                                                onChange={(e) => handleCreditChange(index, "value", e.target.value)}
                                                placeholder="Valor do crédito"
                                                className="!p-3 !w-[30%] !ml-[10px] !h-[50px]"
                                            />
                                            <button type="button" className="cursor-pointer !p-4 bgColor3 !max-w-[200px]  !ml-[40px] rounded" onClick={() => handleRemoveCreditIncluir(index)}>Remover</button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="!mt-10"> {/*Parte dos débitos*/}
                                <h4 className="color1 !mb-4">Organize seus débitos:</h4>
                                <div className="flex items-center">
                                    <form className="flex items-center w-full">

                                        <input
                                            type="text"
                                            value={debitName}  // O valor do input é controlado pelo estado
                                            onChange={e => setDebitName(e.target.value)} // Atualiza o estado com o valor do input
                                            placeholder="Nome do débito ( ex: Conta de Luz )"
                                            className="!p-3 !w-[30%] !h-[50px]"
                                        />

                                        <input
                                            type="text"
                                            value={debitValue}
                                            onChange={e => setDebitValue(e.target.value)}
                                            placeholder="Valor do débito"
                                            className="!p-3 !w-[30%] !h-[50px] !ml-[10px]"
                                        />

                                        <select
                                            value={debitStatusInit}  // Estado para armazenar o status do débito
                                            onChange={e => setDebitStatusInit(e.target.value)} // Atualiza o estado ao selecionar uma opção
                                            className="!p-2 border rounded w-52 !ml-[10px]"
                                        >
                                            <option value="PAGO">PAGO</option>
                                            <option value="PENDENTE">PENDENTE</option>
                                        </select>

                                        <button type="button" className="cursor-pointer !p-4 bgColor1 text-white !max-w-[200px]  !ml-[40px] rounded" onClick={handleAddDebit}>Adicionar Débito</button>
                                    </form>
                                </div>

                                {/* Renderizando os trios inputs de débito */}
                                <div>
                                    {debtsListState.map((debit, index) => (
                                        <div key={index} className="!mt-5">
                                            <input
                                                type="text"
                                                value={debit.name}
                                                onChange={(e) => handleDebtChange(index, "name", e.target.value)}
                                                placeholder="Nome do novo débito"
                                                className="!p-3 !w-[30%] !h-[50px] !mb-3"
                                            />
                                            <input
                                                type="text"
                                                value={debit.value}
                                                onChange={(e) => handleDebtChange(index, "value", e.target.value)}
                                                placeholder="Valor do novo débito"
                                                className="!p-3 !w-[30%] !h-[50px] !mb-3 !ml-[10px]"
                                            />
                                            <select
                                                value={debit.status}  // Estado para armazenar o status do débito
                                                onChange={e => handleDebtChange(index, "status", e.target.value)} // Atualiza o estado ao selecionar uma opção
                                                className="!p-2 border rounded w-52 !ml-[10px]"
                                            >
                                                <option value="PAGO">PAGO</option>
                                                <option value="PENDENTE">PENDENTE</option>
                                            </select>

                                            <button type="button" className="cursor-pointer !p-4 bgColor3 !max-w-[200px]  !ml-[40px] rounded" onClick={() => handleRemoveDebitIncluir(index)}>Remover</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button className="!p-4 bgColor1 text-white !mt-10 cursor-pointer rounded" type="button" onClick={handleOnClickIncluir}>
                                Salvar
                            </button>
                        </div>
                    </div>


                    {/* Caixas com os valores */}

                    {creditsListState.map((credit) => {
                        creditValueNumber += Number(credit.value)
                    })}
                    {debtsListState.map((debit) => {
                        debitValueNumber += Number(debit.value)
                    })}

                    <ValueBoxGroup totalCredits={Number(creditValue) + creditValueNumber} totalDebts={Number(debitValue) + debitValueNumber}></ValueBoxGroup>

                </div>
            )}
        </>
    )
}