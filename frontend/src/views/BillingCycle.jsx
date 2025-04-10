import { ListTab } from "../components/ListTab";
import { IncludeTab } from "../components/IncludeTab";
import { ChangeTab } from "../components/ChangeTab";
import { useDispatch, useSelector } from "react-redux"
import { setActiveTab } from "../store/reducers/ActiveTabSlice";

export function BillingCycle() {

    const dispatch = useDispatch();

    const message = useSelector((state) => state.message.text);
    const messageType = useSelector((state) => state.messageType.type);

    const mostrarListarIncluir = useSelector((state) => state.listarIncluir.mostrarListarIncluir);
    const activeTab = useSelector((state) => state.activeTab.activeTab)
    const mostrarAlterar = useSelector((state) => state.mostrarAlterar.mostrarAlterar)
    
    function handleTabClick(tab) {
        dispatch(setActiveTab(tab)) // Atualiza a aba ativa
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
                <ListTab activeTab={activeTab} tab="listar"></ListTab>


                {/*Conteúdo Aba Incluir */}
                <IncludeTab activeTab={activeTab} tab="incluir"></IncludeTab>


                {/*Conteúdo Aba Alterar */}
                <ChangeTab activeTab={activeTab} tab="alterar" ></ChangeTab>

            </div>
        </div>
    );
}