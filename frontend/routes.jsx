import { createBrowserRouter } from "react-router-dom";
import { Home } from "./src/views/Home";
import { RootLayout } from "./src/views/RootLayout";
import { BillingCycle } from "./src/views/BillingCycle";
import { Dashboard } from "./src/views/Dashboard";
import { Cadastro } from "./src/views/Cadastro";
import { ProtectedRoute } from "./src/components/ProtectedRoute";


export const routes = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout></RootLayout>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/billingCycle',
                element: <BillingCycle></BillingCycle>
            },
            {
                path: '/dashboard',
                element: <ProtectedRoute element={<Dashboard />} /> //ProtectedRoute para proteger as rotas que exigem autenticação.
            },
            {
                path: '/cadastro',
                element: <Cadastro></Cadastro>
            }
        ]
    }
])