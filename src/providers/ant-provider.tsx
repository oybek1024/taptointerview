import {ConfigProvider} from "antd";
import type {ReactNode} from "react";
import {antTheme} from "@/config";


export const AntProvider = ({children}: { children: ReactNode }) => {

    return <ConfigProvider theme={{
        token: antTheme,
        components: {
            Button: {
                paddingBlock: 10,
                borderRadius: 16,
                controlHeightLG: 48
            }
        }
    }}>
        {children}
    </ConfigProvider>
}