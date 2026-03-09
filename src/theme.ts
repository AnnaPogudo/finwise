import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

const HEADER_GRADIENT_LIGHT = "linear-gradient(180deg, #0b8a6a 0%, #086454 100%)";
const HEADER_GRADIENT_DARK = "linear-gradient(180deg, #021c17 0%, #04352b 100%)";
const ICON_BOX_GRADIENT_LIGHT = "linear-gradient(180deg, #0b8a6a, #086454)";
const ICON_BOX_GRADIENT_DARK = "linear-gradient(180deg, #021c17, #04352b)";
const INPUT_BG_LIGHT = "#DDEEE8";
const INPUT_BG_DARK = "#0f2d2a";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: mode === "light" ? "#0b8a6a" : "#059669",
    },
    background: {
      default: mode === "light" ? "#eef5f3" : "#020712",
      paper: mode === "light" ? "#ffffff" : "#050b16",
    },
    text: {
      primary: mode === "light" ? "#06141f" : "#f9fafb",
      secondary: mode === "light" ? "#4b5c70" : "#9ca3af",
    },
    success: {
      main: mode === "light" ? "#2e7d32" : "#4caf50",
    },
  },
  shape: {
    borderRadius: 20,
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
  finwise: {
    headerGradient: mode === "light" ? HEADER_GRADIENT_LIGHT : HEADER_GRADIENT_DARK,
    iconBoxGradient: mode === "light" ? ICON_BOX_GRADIENT_LIGHT : ICON_BOX_GRADIENT_DARK,
    inputBg: mode === "light" ? INPUT_BG_LIGHT : INPUT_BG_DARK,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 40,
            backgroundColor: mode === "light" ? INPUT_BG_LIGHT : INPUT_BG_DARK,
            "& fieldset": { border: "none" },
            "&:hover": {
              backgroundColor: mode === "light" ? INPUT_BG_LIGHT : INPUT_BG_DARK,
            },
            "&.Mui-focused": {
              backgroundColor: mode === "light" ? INPUT_BG_LIGHT : INPUT_BG_DARK,
            },
          },
        },
      },
    },
  },
});

export const createAppTheme = (mode: PaletteMode) =>
  createTheme(getDesignTokens(mode));

export const theme = createAppTheme("light");
