export type Filter = {
  startDate?: string; //ISO(YYYY-MM-DD) format
  endDate?: string; //ISO(YYYY-MM-DD) format
  category?: string;
  minAmount?: number; //default 0
  maxAmount?: number; //default 99999999
  currency?: "CNY" | "KRW";
  transactionType?: "EXPENSE" | "INCOME";
};
