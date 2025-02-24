import { useEffect, useState } from "react";
import SimpleLineChart from "../../components/charts/SimpleLineChart";
import SimplePieChart from "../../components/charts/SimplePieChart";
import { DataPoint } from "../../types/chart";
import { fetchTransactions } from "../../utils/fetch";
import { Transaction } from "../../types/transaction";

const AnalysisPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const loadTransactions = async () => {
    const data = await fetchTransactions();
    setTransactions(data);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  const data: DataPoint[] = [
    { name: "Apple", value: 400 },
    { name: "Banana", value: 300 },
    { name: "Cherry", value: 300 },
    { name: "Grapes", value: 200 },
  ];

  return (
    <div className="border p-4">
      <SimplePieChart data={data} />
    </div>
  );
};

export default AnalysisPage;
