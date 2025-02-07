import { Transaction } from "@/types/transaction";
import axios from "axios";

import { useState, useEffect, use } from "react";

const List = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    axios
      .get("/api/transactions")
      .then((res) => {
        console.log(res.data);
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(transactions);
  }, [transactions]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Description</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.content}</td>
              <td>{transaction.date}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
              <td>{transaction.description}</td>
              <td>{transaction.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
