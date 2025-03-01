export type DataPoint = {
  name: string;
  value: number;
};

export type Filter = {
  startDate?: string; //ISO(YYYY-MM-DD) format
  endDate?: string; //ISO(YYYY-MM-DD) format
  category?: string;
  minAmount?: number; //default 0
  maxAmount?: number; //default 99999999
  currency?: "CNY" | "KRW";
  transactionType?: "EXPENSE" | "INCOME";
};

export type Sort = {
  sortBy: "date" | "amount"; //default: date
  direction: "asc" | "desc"; //default: asc
};

export type Transaction = {
  id: number;
  content: string;
  date: string;
  category: string;
  amount: number;
  currency: string;
  description: string;
  type: string;
};

export type CategoryTotalAmount = {
  category: string;
  totalAmount: number;
};

export type Currency = "CNY" | "KRW";
