import {Layout} from 'antd';
import {Outlet} from "react-router";
import {AppBar} from "@/components/layout/AppBar.tsx";
import {Sidebar} from "@/components/layout/Sidebar.tsx";


const {Header, Content} = Layout;




export const MainLayout = () => {
    return <Layout style={{minHeight: '100vh'}}>
        <Sidebar/>
        <Layout>
            <Header className="flex items-center !bg-white !px-10">
                <AppBar/>
                {/*<Breadcrumb style={{margin: '16px 0'}} items={[{title: 'User'}, {title: 'Bill'}]}/>*/}
            </Header>
            <Content className="!px-10 !py-5 !bg-white">
                <Outlet/>
            </Content>
        </Layout>
    </Layout>
}