import {Clock, DocumentText, Headphone, Icon, MessageText, TickCircle} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {cn} from "@/lib/utils.ts";

export type NotificationType =
    "interview_invite"
    | "application_update"
    | "interview_confirmed"
    | "reminder"
    | "message";

export interface NotificationItemProps {
    id: string | number;
    type: NotificationType;
    title: string;
    message: string;
    timeAgo: string;
    read?: boolean;
    onClick?: () => void;
}

const iconMap: Record<NotificationType, Icon> = {
    interview_invite: Headphone,
    application_update: DocumentText,
    interview_confirmed: TickCircle,
    reminder: Clock,
    message: MessageText,
};

export const NotificationItem = ({
                                     type,
                                     title,
                                     message,
                                     timeAgo,
                                     onClick
                                 }: NotificationItemProps) => {
    const Icon = iconMap[type];

    return (
        <div
            onClick={onClick}
            className={cn(
                "px-6 cursor-pointer hover:bg-gray-50 transition-colors"
            )}
        >
            <div className={cn("flex gap-3 border-b py-4 border-gray-200")}>
                <div className="flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-unknown-gray flex items-center justify-center">
                        <Icon size={24}
                              color={type === "interview_confirmed" ? themeColors.success[500] : themeColors.primary[500]}
                              variant="Bold"/>
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                        <h4 className="font-medium text-base text-gray-dark leading-6 truncate">
                            {title}
                        </h4>
                        <span className="text-xs text-slate-gray whitespace-nowrap flex-shrink-0">
                        {timeAgo}
                    </span>
                    </div>
                    <p className="text-xs text-slate-gray leading-[18px] line-clamp-2">
                        {message}
                    </p>
                </div>
            </div>

        </div>
    );
};

