import {SidebarLogo} from "@/components/layout/SidebarLogo.tsx";
import {Divider, Input, Layout, Menu, type MenuProps} from "antd";
import {ArchiveTick, Briefcase, Logout, Setting2, TableDocument} from "iconsax-reactjs";
import {themeColors} from "@/config/theme.ts";
import UserAvatar from "@/assets/user_icon.png";
import {useState} from "react";

const {Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

export const Sidebar = () => {

    const items: MenuItem[] = [
        {
            key: '1',
            label: 'Job Feed',
            icon: <Briefcase size="24" color={themeColors.gray[700]} variant="Outline"/>
        },
        {
            key: '2',
            label: 'My Interviews',
            icon: <TableDocument size="24" color={themeColors.gray[700]} variant="Outline"/>
        },
        {
            key: '3',
            label: 'Saved Jobs',
            icon: <ArchiveTick size="24" color={themeColors.gray[700]} variant="Outline"/>
        },
    ]

    const [collapsed, setCollapsed] = useState(false);

    return <Sider
        theme="light"
        className="border-r border-r-gray-200"
        width={280}
        style={{
            background: "white",
            overflow: 'auto',
            height: '100vh',
            position: 'sticky',
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
            scrollbarWidth: 'thin',
            scrollbarGutter: 'stable',
        }}
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
    >
        <div className="flex flex-col px-4 pt-6 pb-5 gap-5">
            <SidebarLogo/>
            <Input
                variant={"filled"}
                placeholder="Search"
                size="large"
                className="h-10"
            />
        </div>
        <Menu
            mode="inline"
            style={{background: "white"}}
            items={items}
            className="!px-3"
        />


        <div className="px-4 fixed bottom-10">
            <div
                className="cursor-pointer px-3 py-2 flex gap-3 hover:bg-[rgba(0,0,0,0.06)] rounded-xl transition items-center">
                <Setting2 size="24" color={themeColors.gray[700]} variant="Outline"/>
                <p style={{color: 'rgba(0,0,0,0.88)'}}>Settings</p>
            </div>
            <Divider size="middle"/>
            <div className="flex items-center gap-4">
                <div className="size-10 rounded-full overflow-hidden">
                    <img src={UserAvatar} alt="User avatar" className="w-full h-full"/>
                </div>
                <div className="flex flex-col flex-1">
                    <p className="font-semibold text-sm text-gray-700">John Doe</p>
                    <p className="text-gray-600 text-sm">johndoe@gmail.com</p>
                </div>
                <Logout size="20" color={themeColors.gray[500]} variant="Outline"/>
            </div>
        </div>
    </Sider>
}