import { useState, useEffect } from "react";
import axios from "axios";
import { List } from "@/components/List";
import { InsertForm } from "@/components/InsertForm";
import { Transaction } from "@/types/transaction";

const Index = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 데이터 불러오기 함수
  const fetchTransactions = async () => {
    try {
      const res = await axios.get("/api/transactions");
      setTransactions(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions(); // 최초 실행
  }, []);

  return (
    <div className="p-6">
      <List transactions={transactions} fetchTransactions={fetchTransactions} />
      <InsertForm onDataAdded={fetchTransactions} />
    </div>
  );
};

export default Index;
