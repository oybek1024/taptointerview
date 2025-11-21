import {HeaderTitle} from "@/portals/header-title.tsx";
import {ArrowRight2, Logout, LogoutCurve} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {cn} from "@/lib/utils.ts";
import {Divider} from "antd";
import {useRouter} from "@/hooks/useRouter.ts";
import {DestructiveModal, type ModalRef} from "@/components";
import {useRef} from "react";

type SettingsItem = {
    label: string;
    routeId?: string;
    onClick?: () => void;
    isDestructive?: boolean;
};

type SettingsSection = {
    title: string;
    items: SettingsItem[];
};

const settingsSections: SettingsSection[] = [
    {
        title: "Details",
        items: [
            {label: "Personal Info", routeId: "personalInfo"},
            {label: "Preferences", routeId: "preferences"},
            {label: "Qualifications", routeId: "qualifications"},
            {label: "Change Password"},
        ]
    },
    {
        title: "Help & Policies",
        items: [
            {label: "Privacy Policy"},
            {label: "Terms of Use"},
            {label: "Contact Us"},
        ]
    },
    {
        title: "Notifications",
        items: [
            {label: "Notifications Settings"},
        ]
    },
    {
        title: "Account",
        items: [
            {label: "Logout", isDestructive: true},
        ]
    },
];

const SettingsItemComponent = ({label, onClick, isDestructive}: SettingsItem) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                "flex items-center justify-between px-6 py-4 rounded-2xl bg-unknown-gray cursor-pointer hover:bg-gray-100 transition-colors",
                isDestructive && "bg-red-50 hover:bg-red-100"
            )}
        >
            <div className="flex items-center gap-2">
                {isDestructive && (<LogoutCurve size="20" color={themeColors.error[500]}/>)}
                <span
                    className={cn(
                        "text-base font-semibold",
                        isDestructive ? "text-error-500" : "text-slate-gray"
                    )}
                >
                {label}
            </span>
            </div>
            <ArrowRight2
                size={20}
                color={isDestructive ? themeColors.error[500] : themeColors.gray[500]}
                variant="Outline"
            />
        </div>
    );
};

export const SettingsPage = () => {
    const {push} = useRouter();
    const deleteAccountModal = useRef<ModalRef>(null);

    const handleItemClick = (item: SettingsItem) => {
        if (item.routeId) {
            return push(item.routeId);
        }
        if (item.isDestructive) {
            return deleteAccountModal.current?.open();
        }
    };

    return (
        <div className="flex flex-col w-full gap-4">
            <HeaderTitle>
                Settings
            </HeaderTitle>

            <DestructiveModal
                ref={deleteAccountModal}
                title="Log out"
                content="Are you sure you want to log out?"
                buttonsTitle={{
                    close: "Cancel",
                    action: "Log out"
                }}
                onSubmit={() => deleteAccountModal.current?.close()}
                icon={<Logout size="24" color={themeColors.error[500]}/>}
            />

            <div className="flex flex-col gap-8 py-2">
                {settingsSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                        <div className="flex gap-4">
                            <h2 className="text-lg font-semibold text-gray-dark min-w-xs">
                                {section.title}
                            </h2>
                            <div className="flex flex-1 flex-col gap-2">
                                {section.items.map((item, itemIndex) => (
                                    <SettingsItemComponent
                                        key={itemIndex}
                                        {...item}
                                        onClick={() => handleItemClick(item)}
                                    />
                                ))}
                            </div>
                        </div>
                        {sectionIndex < settingsSections.length - 1 && (<Divider size="small" className="!py-0"/>)}
                    </div>
                ))}
            </div>
        </div>
    );
};

