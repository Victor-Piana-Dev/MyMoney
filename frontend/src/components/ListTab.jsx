import { useDispatch, useSelector } from "react-redux";
import { useHandleOnClickAlterar } from "../hooks/useHandleOnClickAlterar";
import { setDataCycle } from "../store/reducers/GlobalDataChangeTabSlice";
import { deleteBillingCycle, useGetBillingCycles } from "../services/service.module";
import { setMessage } from "../store/reducers/MessageSlice";
import { setMessageType } from "../store/reducers/MessageTypeSlice";
import { useEffect, useState } from "react";

export function ListTab({ activeTab, tab }) {
    const dispatch = useDispatch();
    const handleOnClickAlterar = useHandleOnClickAlterar()
    const [firstRender, setFirstRender] = useState(true); // Estado para controlar a primeira renderização
    const { pegaBillingCycles } = useGetBillingCycles();
    const billings = useSelector(state => state.billingCycles.billings);

    useEffect(() => {
        // Se a aba ativa for a "listar" e for a primeira vez que o componente é exibido
        console.log('tab', tab)
        console.log('activeTab', activeTab)
        console.log('firstRender', firstRender)
        if (activeTab === tab && firstRender) {
            pegaBillingCycles();  // Chama a função para carregar os dados
            setFirstRender(false); // Atualiza para que a função não seja chamada novamente
        }
    }, [activeTab, tab, firstRender, pegaBillingCycles]); // Dependências de useEffect

    // pegaBillingCycles(); // Atualiza a lista após inclusão (pegando do banco toda vez que o ListTab é chamado, talvez seja melhor criar um slice para o billings do includeTab e pegar os dados desse slice?)
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

    return (
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
                                                    dispatch(setDataCycle({
                                                        id: billing._id,
                                                        name: billing.name,
                                                        month: billing.month,
                                                        year: billing.year,
                                                        credits: billing.credits,
                                                        debts: billing.debts
                                                    }));
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