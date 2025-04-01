import { Footer } from "../components/Footer";
import { Menu } from "../components/Menu";
import { Outlet, useLocation } from "react-router-dom";

export function RootLayout() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const isRegistering = location.pathname === "/cadastro";
    const isBilling = location.pathname === "/billingCycle";

    // min-h-screen garante que o layout tenha pelo menos a altura da tela
    //flex-col para se comportar em colunas no estilo block
    //flex-grow faz com que o outlet ocupe o espaço restante entre o menu e o footer
    return (
        <div className="flex flex-col min-h-screen">
            {/* Esconde o menu na Home usando Tailwind */}
            <div className={isHome || isRegistering ? "hidden" : "flex"}>
                <Menu />
            </div>

            <main className={isBilling ? 'block !mt-10' : 'flex flex-grow !mt-10 items-center justify-center'}>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

