import { useDispatch } from "react-redux";
import { setMostrarAlterar } from "../store/reducers/HandleChangeSlice";
import { setMostrarListarIncluir } from "../store/reducers/HandleTabsListIncludeSlice";
import { setActiveTab } from "../store/reducers/ActiveTabSlice";

export function useHandleBack() {
    const dispatch = useDispatch();

    return () => {
        dispatch(setMostrarAlterar(false));  
        dispatch(setMostrarListarIncluir(true));  
        dispatch(setActiveTab("listar")); 
    };
}