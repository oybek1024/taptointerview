import {ConfigProvider} from "antd";
import type {ReactNode} from "react";
import {appAntdTheme, themeColors} from "@/config/theme.ts";


export const AntProvider = ({children}: { children: ReactNode }) => {

    return <ConfigProvider theme={{
        ...appAntdTheme,
        components: {
            Button: {
                paddingBlock: 10,
                borderRadiusLG: 16,
                controlHeightLG: 44,
                colorPrimaryBorder: themeColors.primary[500],
                borderColorDisabled: 'transparent',
                colorBgContainerDisabled: themeColors.primary[200],
                colorTextDisabled: "white",
                fontWeight: 600
            },
            Input: {
                colorTextPlaceholder: themeColors.gray[400],
                paddingInlineLG: 14,
                activeBg: themeColors.custom.unknownGray,
                controlHeightLG: 44,
                borderRadiusLG: 16,
                colorFillTertiary: themeColors.custom.unknownGray
            },
            Form: {
                verticalLabelPadding: '0 0 6px',
                labelColor: themeColors.gray[700]
            },
            Steps: {
                padding: 0,
                margin: 0,
                titleLineHeight: 40
            },
            Slider: {
                dotSize: 20,
                handleSize: 16,
                railSize: 10,
                borderRadiusXS: 10,
                trackBg: themeColors.primary[500],
                handleColor: themeColors.primary[500]
            },
            Upload: {
                padding: 8,
                borderRadiusLG: 20
            },
            Popover: {
                boxShadowSecondary: "",
                colorBgElevated: "white",
                padding: 0,
                margin: 0,
            },
            Segmented: {
                itemSelectedBg: themeColors.primary[500],
                itemSelectedColor: "white",
                trackPadding: 3,
                trackBg: themeColors.custom.unknownGray,
            }
        }
    }}>
        {children}
    </ConfigProvider>
}