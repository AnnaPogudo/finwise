import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    finwise: {
      headerGradient: string;
      iconBoxGradient: string;
      inputBg: string;
    };
  }
  interface ThemeOptions {
    finwise?: {
      headerGradient?: string;
      iconBoxGradient?: string;
      inputBg?: string;
    };
  }
}
