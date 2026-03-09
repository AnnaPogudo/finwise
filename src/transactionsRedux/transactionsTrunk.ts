import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Transaction } from "../enums/typeResponse";

const API_URL =
  "https://69826d4b9c3efeb892a26071.mockapi.io/userInfo";

export const fetchTransactions = createAsyncThunk<Transaction[]>(
  "transactions/fetchAll",
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Failed to fetch transactions");
    }
    return res.json();
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