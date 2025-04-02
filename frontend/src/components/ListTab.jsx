import { useHandleOnClickAlterar } from "../hooks/useHandleOnClickAlterar";

export function ListTab({activeTab, tab, billings, setGuardaDadosParaAlterar, handleOnClickExcluir}){
    
    const handleOnClickAlterar = useHandleOnClickAlterar()
    
    return(
        <>
        {/* Aba Listar */}
        {activeTab === tab && (
                    <div className="p-4 !rounded-lg bgColor4 dark:bg-gray-800">
                        <div className="!rounded-lg relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className=" text-xs text-gray-700 uppercase bgColor4 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="">
                                        <th scope="col" className="!px-6 !py-3">
                                            Nome
                                        </th>
                                        <th scope="col" className="!px-6 !py-3">
                                            Mês
                                        </th>
                                        <th scope="col" className="!px-6 !py-3">
                                            Ano
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {billings.map((billing) => (
                                        <tr key={billing._id} className="bgColor2 border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                                            <th scope="row" className="!px-6 !py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {billing.name}
                                            </th>
                                            <td className="!px-6 !py-4 font-medium">
                                                {billing.month}
                                            </td>
                                            <td className="!px-6 !py-4 font-medium">
                                                {billing.year}
                                            </td>
                                            <td className="!px-6 !py-4 font-medium">
                                                <button
                                                    className="bgColor3 !p-4 !mt-2 !mb-2 rounded cursor-pointer"
                                                    onClick={() => {
                                                        handleOnClickAlterar();
                                                        setGuardaDadosParaAlterar({ id: billing._id, name: billing.name, month: billing.month, year: billing.year, credits: billing.credits, debts: billing.debts });
                                                    }}
                                                >
                                                    Alterar
                                                </button>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button className="bgColor5 text-white !p-4 !mt-2 !mb-2 rounded cursor-pointer" onClick={() => handleOnClickExcluir(billing._id)}>
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
        </>
    )
}