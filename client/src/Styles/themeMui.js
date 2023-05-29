import { createTheme } from "@mui/material";
const theme = createTheme({
    palette: {
        // palette values for dark mode
        primary: {
            dark: "#5b6cbf",
            main: "#6677C8",
            light: "#6677C880",
            contrastText: "#2F2D3F",
        },
        teal: {
            dark: "#1fa5a2",
            main: "#1BB6B2",
            light: "#1BB6B280",
            contrastText: "#FFFFFF",
        },
        pink: {
            dark: "#fb7f8c",
            main: "#FFA5AE",
            light: "#FFA5AE80",
            contrastText: "#2F2D3F",
        },
        yellow: {
            main: "#FFE4A3",
            light: "#FFE4A380",
            contrastText: "#2F2D3F",
        },
        black: {
            main: "#2F2D3F",
        },
        neutral: {
            dark: "#626161",
            main: "#A9A9A9",
            light: "#F2F2F2",
        },
        background: {
            white: "#FFFFFF",
        },
        white: {
            main: "#FFFFFF",
        },
        gray: { main: "#91989F" },
    },
    typography: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        h1: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 40,
        },
        h2: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 28,
        },
        h3: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 24,
        },
        h4: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 20,
        },
        h5: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 16,
        },
        h6: {
            fontFamily: ["Inter", "sans-serif"].join(","),
            fontSize: 14,
        },
        h7: {
            fontFamily: ["Noto Sans TC", "sans-serif"].join(","),
            fontSize: 12,
        },
    },
});

export default theme;
