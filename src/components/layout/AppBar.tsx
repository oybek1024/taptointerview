import {NotificationPopover} from "@/components/ui/NotificationPopover.tsx";

export const AppBar = () => (
    <div className="flex justify-between items-center w-full">
        <p id="appBarHeaderTitle" className="hidden font-bold text-3xl text-gray-dark"></p>
        <div id="appBarBreadCrumb" className="hidden"/>
        <NotificationPopover/>
    </div>
)