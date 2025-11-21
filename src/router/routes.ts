import {createBrowserRouter, type RouteObject} from "react-router";
import {mainLayoutGuard} from "@/router";
import {MainLayout} from "../layouts/main-layout.tsx";
import {AuthLayout} from "../layouts/auth-layout.tsx";
import {SignUp} from "@/pages/auth/sign-up.tsx";
import {JobFeedList} from "@/pages/main/job-feed";
import {SignIn} from "@/pages/auth/sign-in.tsx";
import {ForgotPassword} from "@/pages/auth/sub/forgot-password.tsx";
import {Home} from "@/pages/main";
import {SavedJobList} from "@/pages/main/job-feed/saved-jobs.tsx";
import {MyInterviewList} from "@/pages/main/myInterview";
import {SettingsPage} from "@/pages/main/settings";
import {PersonalInfo} from "@/pages/main/settings/personal-info.tsx";
import {Auth} from "@/pages/auth";
import {View} from "@/pages/view.tsx";
import {Preferences} from "@/pages/main/settings/preferences.tsx";
import {Qualifications} from "@/pages/main/settings/qualifications.tsx";


export const _routes: RouteObject[] = [
    {
        id: "main",
        path: "/",
        Component: MainLayout,
        middleware: [mainLayoutGuard],
        children: [
            {
                id: 'home',
                index: true,
                Component: Home
            },
            {
                id: 'jobFeed',
                path: 'jobFeed',
                Component: JobFeedList
            },
            {
                id: 'savedJobs',
                path: 'savedJobs',
                Component: SavedJobList
            },
            {
                id: 'myInterviews',
                path: 'myInterviews',
                Component: MyInterviewList
            },
            {
                id: 'settings',
                path: 'settings',
                Component: View,
                children: [
                    {
                        index: true,
                        Component: SettingsPage
                    },
                    {
                        id: 'personalInfo',
                        path: 'personal-info',
                        Component: PersonalInfo
                    },
                    {
                        id: 'preferences',
                        path: 'preferences',
                        Component: Preferences
                    },
                    {
                        id: 'qualifications',
                        path: 'qualifications',
                        Component: Qualifications
                    }
                ]
            },
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
                Component: Auth
            },
            {
                id: "signIn",
                path: "signIn",
                Component: SignIn
            },
            {
                id: "forgotPassword",
                path: "forgotPassword",
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