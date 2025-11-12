import {createBrowserRouter, type RouteObject} from "react-router";
import {mainLayoutGuard} from "@/router";
import {MainLayout} from "../layouts/main-layout.tsx";
import {AuthLayout} from "../layouts/auth-layout.tsx";
import {SignUp} from "@/pages/auth/sign-up.tsx";
import {View} from "@/pages/view.tsx";


export const _routes: RouteObject[] = [
    {
        id: "main",
        path: "/",
        Component: MainLayout,
        middleware: [mainLayoutGuard],
    },
    {
        id: "auth",
        path: "/auth",
        Component: AuthLayout,
        children: [
            {
                id: "authDefault",
                index: true,
                Component: View
            },
            {
                id: "signUp",
                path: "signUp/:mode",
                Component: SignUp
            }
        ]
    }
]


export const routes = createBrowserRouter(_routes);