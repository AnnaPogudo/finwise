import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../transactionsRedux/transactionsSlice";
import themeReducer from "../themeSlice";
import authReducer from "../authRedux/authSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    theme: themeReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;