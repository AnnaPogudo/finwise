export interface users {
    readonly id: number;
    image: string;
    email: string,
    phone: string,
    password: string,
    fullname: string,
}

export interface usersInfo {
    readonly id: number;
    categoryId: string;
    amount: number;
    type: string;
    date: string;
    note?: string;
}

export type TransactionType = "payment" | "deposit";

export interface Transaction {
  id: string;
  userId: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  date: string;
  note?: string;
}