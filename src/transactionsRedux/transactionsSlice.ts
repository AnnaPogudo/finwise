import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../enums/typeResponse";
import { fetchTransactions, addTransaction } from "./transactionsTrunk";
import { logout } from "../authRedux/authSlice";
import { login, register } from "../authRedux/authThunk";

interface TransactionsState {
  items: Transaction[];
  loading: boolean;
  error: string | null;
}

const initialState: TransactionsState = {
  items: [],
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.items = [];
        state.error = null;
      })
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to load";
        state.items = [];
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

export default transactionsSlice.reducer;