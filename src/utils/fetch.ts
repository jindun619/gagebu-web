import axios from "axios";
import { CategoryTotalAmount, Sort } from "../types";
import { Filter } from "../types";
import { Transaction } from "../types";

const buildQueryParams = (sort?: Sort | null, filter?: Filter | null) => {
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

  return queryParams;
};

export const fetchTransactions = async (
  sort?: Sort | null,
  filter?: Filter | null
): Promise<Transaction[]> => {
  try {
    const queryParams = buildQueryParams(sort, filter);
    const res = await axios.get("/api/transactions", { params: queryParams });
    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const fetchCategoryWiseTotalAmount = async (
  startDate?: string | null,
  endDate?: string | null
): Promise<CategoryTotalAmount[]> => {
  try {
    const queryParams: Record<string, string | number> = {};
    if (startDate) queryParams.startDate = startDate;
    if (endDate) queryParams.endDate = endDate;

    const res = await axios.get("/api/transactions/category-wise-amount", {
      params: queryParams,
    });

    return res.data;
  } catch (err) {
    console.error(err);
    return [];
  }
};
