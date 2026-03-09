import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Transaction } from "../enums/typeResponse";

const API_URL =
  "https://69826d4b9c3efeb892a26071.mockapi.io/userInfo";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchAll",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as { auth: { user: { id: string } | null } };
    const userId = state.auth.user?.id;
    if (!userId) {
      return rejectWithValue("Not logged in");
    }
    const res = await fetch(`${API_URL}?userId=${encodeURIComponent(userId)}`);
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    const data: Transaction[] = await res.json();
    return data.filter((t) => t.userId === userId);
  }
);

export const addTransaction = createAsyncThunk<
  Transaction,
  Omit<Transaction, "id">
>("transactions/add", async (newTransaction) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTransaction),
  });

  if (!res.ok) {
    throw new Error("Failed to add transaction");
  }

  return res.json();
});