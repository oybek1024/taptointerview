import {useEffect, useState} from "react";
import {Button, Popover} from "antd";
import {NotificationItem, type NotificationItemProps} from "@/components/ui/NotificationItem.tsx";
import {Notification} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";

export interface NotificationPopoverProps {
    notifications?: NotificationItemProps[];
    onMarkAllAsRead?: () => void;
    onNotificationClick?: (id: string | number) => void;
}

const mockNotifications: NotificationItemProps[] = [
    {
        id: 1,
        type: "interview_invite",
        title: "Interview invite",
        message: "FedEx Logistics invited you to an interview.",
        timeAgo: "2h ago",
        read: false
    },
    {
        id: 2,
        type: "application_update",
        title: "Application update",
        message: "Your application for 'Picker/Packer' has been viewed",
        timeAgo: "2h ago",
        read: true
    },
    {
        id: 3,
        type: "interview_confirmed",
        title: "Interview confirmed",
        message: "Interview with Target confirmed for Nov 9, 2 PM.",
        timeAgo: "2h ago",
        read: false
    },
    {
        id: 4,
        type: "reminder",
        title: "Reminder",
        message: "Upcoming interview in 30 minutes.",
        timeAgo: "2h ago",
        read: false
    },
    {
        id: 5,
        type: "message",
        title: "Message",
        message: "You have a new message from Walmart HR.",
        timeAgo: "2h ago",
        read: false
    },
];

export const NotificationPopover = ({
                                        notifications = mockNotifications,
                                        onMarkAllAsRead,
                                        onNotificationClick
                                    }: NotificationPopoverProps) => {
    const [open, setOpen] = useState(false);
    const [localNotifications, setLocalNotifications] = useState(notifications);

    useEffect(() => {
        setLocalNotifications(notifications);
    }, [notifications]);

    const handleMarkAllAsRead = () => {
        const updated = localNotifications.map(n => ({...n, read: true}));
        setLocalNotifications(updated);
        onMarkAllAsRead?.();
    };

    const handleNotificationClick = (id: string | number) => {
        const updated = localNotifications.map(n =>
            n.id === id ? {...n, read: true} : n
        );
        setLocalNotifications(updated);
        onNotificationClick?.(id);
        setOpen(false);
    };

    const unreadCount = localNotifications.filter(n => !n.read).length;

    const content = (
        <div className="w-[480px] rounded-2xl overflow-hidden border border-gray-200 p-2 bg-white">
            {/* Header */}
            <div className="px-4">
                <div className="flex border-b py-4 border-gray-200 items-center justify-between gap-4">
                    <h3 className="font-semibold text-lg text-[#111827] leading-7">
                        Notifications
                    </h3>
                    <Button
                        type="text"
                        size="small"
                        onClick={handleMarkAllAsRead}
                        className="!h-9 !px-4 !rounded-2xl !bg-[#f5f5f6] !font-semibold !text-sm !text-[#344054] hover:!bg-gray-200 !border-none"
                    >
                        Mark All As Read
                    </Button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-[396px] overflow-y-auto">
                {localNotifications.length === 0 ? (
                    <div className="py-8 text-center text-gray-500">
                        No notifications
                    </div>
                ) : (
                    localNotifications.map((notification, index) => (
                        <div key={notification.id}>
                            <NotificationItem
                                {...notification}
                                id={index}
                                onClick={() => handleNotificationClick(notification.id)}
                            />
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    return (
        <Popover
            content={content}
            trigger="click"
            title=""
            open={open}
            onOpenChange={setOpen}
            placement="bottomRight"
            arrow={false}
            overlayInnerStyle={{
                padding: 0,
                background: "transparent",
                boxShadow: "none"
            }}
        >
            <div
                className=" size-10 bg-unknown-gray rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                <div className="relative size-5">
                    {unreadCount > 0 && (
                        <div
                            className="absolute top-0 right-0 size-2 rounded-full bg-primary-500 ring-3 ring-unknown-gray"/>
                    )}
                    <Notification size="20" color={themeColors.gray[700]} variant="Outline"/>
                </div>


            </div>
        </Popover>
    );
};

