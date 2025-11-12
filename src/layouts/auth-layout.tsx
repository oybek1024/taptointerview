import {Outlet} from "react-router";
import PatternDecorative from '@/assets/pattern_decorative.svg'
import Logo from '@/assets/logo.png'

export const AuthLayout = () => {
    return <div className="h-screen">
        <div className="min-w-xs max-w-3xl h-full mx-auto relative">
            <div className="absolute top-0 left-0 w-full -z-10">
                <img src={PatternDecorative} alt="PatternDecorative"/>
            </div>
            <div className="flex flex-col w-full justify-center items-center pt-[90px]">
                <div>
                    <img src={Logo} alt="Logo"/>
                </div>
                <Outlet/>
            </div>
        </div>
    </div>
}