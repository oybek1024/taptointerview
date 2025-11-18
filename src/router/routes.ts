import {createBrowserRouter, type RouteObject} from "react-router";
import {mainLayoutGuard} from "@/router";
import {MainLayout} from "../layouts/main-layout.tsx";
import {AuthLayout} from "../layouts/auth-layout.tsx";
import {SignUp} from "@/pages/auth/sign-up.tsx";
import {View} from "@/pages/view.tsx";
import {JobFeedList} from "@/pages/main/job-feed";
import {Login} from "@/pages/auth/sub/login.tsx";
import {ForgotPassword} from "@/pages/auth/sub/forgot-password.tsx";


export const _routes: RouteObject[] = [
    {
        id: "main",
        path: "/",
        Component: MainLayout,
        middleware: [mainLayoutGuard],
        children: [
            {
                id: 'jobFeed',
                index: true,
                Component: JobFeedList
            }
        ]
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
                id: "login",
                path: "login",
                Component: Login
            },
            {
                id: "forgotPassword",
                path: "forgot-password",
                Component: ForgotPassword
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