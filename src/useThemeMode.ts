import { useCallback, useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "./storage/hooks/hooks";
import { toggleTheme } from "./themeSlice";
import { createAppTheme } from "./theme";
import { STORAGE_KEYS } from "./authRedux/storageKeys";

export const useThemeMode = () => {
  const dispatch = useAppDispatch();
  const mode = useAppSelector((state) => state.theme.mode);

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, mode);
  }, [mode]);

  const handleToggleTheme = useCallback(() => {
    dispatch(toggleTheme());
  }, [dispatch]);

  return {
    theme,
    mode,
    toggleTheme: handleToggleTheme,
  };
};

