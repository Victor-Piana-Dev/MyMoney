import { useDispatch } from "react-redux";
import { logout } from "../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";

export function LogoutButton() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(logout()); // Remove token do Redux e localStorage
        navigate("/"); // Redireciona para login
    }

    return <button onClick={handleLogout}>Sair</button>;
}