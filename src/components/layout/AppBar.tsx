import {NotificationPopover} from "@/components/ui/NotificationPopover.tsx";

export const AppBar = () => (
    <div className="flex justify-between items-center w-full">
        <p className="font-bold text-3xl text-gray-dark">Joob feed</p>
        <NotificationPopover/>
    </div>
)