export const themeColors = {
    primary: {
        50: "#FFF0E6",
        100: "#FFD1B0",
        200: "#FFBA8A",
        300: "#FF9B54",
        400: "#FF8833",
        500: "#FF6A00",
        600: "#E86000",
        700: "#B54B00",
        800: "#8C3A00",
        900: "#6B2D00",
        950: "#6B2D00",
    },
    gray: {
        50: "#F9FAFB",
        100: "#F2F4F7",
        200: "#EAECF0",
        300: "#D0D5DD",
        400: "#98A2B3",
        500: "#667085",
        600: "#475467",
        700: "#344054",
        800: "#1D2939",
        900: "#101828",
        950: "#0C111D",
    },
    error: {
        50: "#FEF3F2",
        100: "#FEE4E2",
        200: "#FECDCA",
        300: "#FDA29B",
        400: "#F97066",
        500: "#F04438",
        600: "#D92D20",
        700: "#B42318",
        800: "#912018",
        900: "#7A271A",
        950: "#55160C",
    },
    warning: {
        50: "#FFFAEB",
        100: "#FEF0C7",
        200: "#FEDF89",
        300: "#FEC84B",
        400: "#FDB022",
        500: "#F79009",
        600: "#DC6803",
        700: "#B54708",
        800: "#93370D",
        900: "#7A2E0E",
        950: "#4E1D09",
    },
    success: {
        50: "#ECFDF3",
        100: "#DCFAE6",
        200: "#A9EFC5",
        300: "#75E0A7",
        400: "#47CD89",
        500: "#17B26A",
        600: "#079455",
        700: "#067647",
        800: "#085D3A",
        900: "#074D31",
        950: "#053321",
    },
    custom: {
        slateGray: "#2B2B2B",
        unknownGray: "#F6F6F6",
    },
};

export function getAppCSSVar(name: string): string {
    if (typeof window === "undefined") return "";
    return getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();
}

export function getAppColor(name: string, shade: number | string = 500): string {
    return getAppCSSVar(`--color-${name}-${shade}`);
}

export const appAntdTheme = {
    token: {
        colorPrimary: themeColors.primary[500],
        colorError: themeColors.error[500],
        colorSuccess: themeColors.success[500],
        colorWarning: themeColors.warning[500],
        colorTextBase: themeColors.gray[900],
        colorBgBase: themeColors.gray[50],
        borderRadius: 12,
    },
};
