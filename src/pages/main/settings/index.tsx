import {HeaderTitle} from "@/portals/header-title.tsx";
import {ArrowRight2, LogoutCurve} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import {cn} from "@/lib/utils.ts";
import {Divider} from "antd";

type SettingsItem = {
    label: string;
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
            {label: "Personal Info"},
            {label: "Preferences"},
            {label: "Qualifications"},
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
                        isDestructive ? "text-[#f04438]" : "text-[#2b2b2b]"
                    )}
                >
                {label}
            </span>
            </div>
            <ArrowRight2
                size={20}
                color={isDestructive ? "#f04438" : themeColors.gray[500]}
                variant="Outline"
            />
        </div>
    );
};

export const SettingsPage = () => {
    return (
        <div className="flex flex-col w-full gap-4">
            <HeaderTitle>
                Settings
            </HeaderTitle>

            <div className="flex flex-col gap-8 py-2">
                {settingsSections.map((section, sectionIndex) => (
                    <>
                        <div key={sectionIndex} className="flex gap-4">
                            <h2 className="text-lg font-semibold text-gray-dark min-w-xs">
                                {section.title}
                            </h2>
                            <div className="flex flex-1 flex-col gap-2">
                                {section.items.map((item, itemIndex) => (
                                    <SettingsItemComponent
                                        key={itemIndex}
                                        {...item}
                                        onClick={() => {
                                            console.log(`Navigate to: ${item.label}`);
                                            item.onClick?.();
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                        {sectionIndex < settingsSections.length - 1 && (<Divider size="small" className="!py-0"/>)}
                    </>
                ))}
            </div>
        </div>
    );
};

