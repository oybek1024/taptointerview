import {redirect} from "react-router";

export const mainLayoutGuard = async () => {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
        throw redirect("/auth");
    }
    return null;
};