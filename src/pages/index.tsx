import { useState } from "react";
import { TransactionList } from "../components/TransactionList";
import { InsertForm } from "../components/InsertForm";

const IndexPage = () => {
  return (
    <div className="p-6">
      <TransactionList />
      <InsertForm />
    </div>
  );
};

export default IndexPage;
