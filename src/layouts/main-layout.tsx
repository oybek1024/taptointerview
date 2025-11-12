import {Outlet} from "react-router";

export const MainLayout = () => {
    return <div className="h-screen">
        Main layout
        <Outlet/>
    </div>
}