import axios from "axios";
import { Sort } from "../types/sort";
import { Filter } from "../types/filter";
import { Transaction } from "../types/transaction";

export const fetchTransactions = async (
  sort: Sort | null,
  filter: Filter | null
): Promise<Transaction[]> => {
  try {
    const queryParams: Record<string, string | number> = {};

    if (sort) {
      queryParams.sortBy = sort.sortBy;
      queryParams.direction = sort.direction;
    }

    if (filter) {
      if (filter.startDate) queryParams.startDate = filter.startDate;
      if (filter.endDate) queryParams.endDate = filter.endDate;
      if (filter.category) queryParams.category = filter.category;
      if (filter.minAmount) queryParams.minAmount = filter.minAmount;
      if (filter.maxAmount) queryParams.maxAmount = filter.maxAmount;
      if (filter.currency) queryParams.currency = filter.currency;
      if (filter.transactionType)
        queryParams.transactionType = filter.transactionType;
    }

    const res = await axios.get("/api/transactions", {
      params: queryParams,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
