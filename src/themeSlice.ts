import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PaletteMode } from "@mui/material";
import { STORAGE_KEYS } from "./authRedux/storageKeys";

interface ThemeState {
  mode: PaletteMode;
}

const storedTheme = (() => {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem(STORAGE_KEYS.THEME);
  return saved === "dark" || saved === "light" ? saved : "light";
})();

const initialState: ThemeState = {
  mode: storedTheme,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setTheme(state, action: PayloadAction<PaletteMode>) {
      state.mode = action.payload;
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;

