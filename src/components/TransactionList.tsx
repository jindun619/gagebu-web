import { Transaction } from "../types";
import { useState, useEffect } from "react";
import { Sort } from "../types";
import { Filter } from "../types";
import { FilterForm } from "./FilterForm";
import { SortForm } from "./SortForm";
import { TransactionsTable } from "./TransactionsTable";
import { fetchTransactions } from "../utils/fetch";

const TransactionList = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sort, setSort] = useState<Sort | null>(null);
  const [filter, setFilter] = useState<Filter | null>(null);
  const [filterVisible, setFilterVisible] = useState(false);

  useEffect(() => {
    const loadTransactions = async () => {
      const data = await fetchTransactions(sort, filter);
      setTransactions(data);
    };
    loadTransactions();
  }, [sort, filter]);

  const handleSortChange = (
    sortBy: "date" | "amount",
    direction: "asc" | "desc"
  ) => {
    setSort({ sortBy, direction });
  };

  return (
    <div className="p-6">
      <FilterForm
        filter={filter}
        setFilter={setFilter}
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
      />
      <SortForm handleSortChange={handleSortChange} />
      <TransactionsTable
        transactions={transactions}
        fetchTransactions={() => fetchTransactions(sort, filter)}
      />
    </div>
  );
};

export { TransactionList };
