import {NotificationPopover} from "@/components/ui/NotificationPopover.tsx";

export const AppBar = () => (
    <div className="flex justify-between items-center w-full">
        <p id="appBarHeaderTitle" className="font-bold text-3xl text-gray-dark"></p>
        <NotificationPopover/>
    </div>
)