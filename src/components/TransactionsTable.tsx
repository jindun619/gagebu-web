import { Transaction } from "../types/transaction";
import axios from "axios";
import { useState } from "react";

interface TransactionsTableProps {
  transactions: Transaction[];
  fetchTransactions: () => void;
}

const TransactionsTable = ({
  transactions,
  fetchTransactions,
}: TransactionsTableProps) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<Transaction>>({});

  const handleEdit = (id: number, field: keyof Transaction, value: any) => {
    setEditingId(id);
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (field: keyof Transaction, value: any) => {
    setEditedData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id: number) => {
    try {
      await axios.patch(`/api/transactions/${id}`, editedData);
      fetchTransactions();
    } catch (err) {
      console.error(err);
    } finally {
      setEditingId(null);
      setEditedData({});
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/api/transactions/${id}`);
        fetchTransactions();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full table-auto">
        <thead>
          <tr>
            <th>ID</th>
            <th>내용</th>
            <th>날짜</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>화폐</th>
            <th>설명</th>
            <th>타입</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>

              <td
                onClick={() =>
                  handleEdit(transaction.id, "content", transaction.content)
                }
              >
                {editingId === transaction.id ? (
                  <input
                    type="text"
                    value={editedData.content ?? transaction.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    onBlur={() => handleSave(transaction.id)}
                    className="input input-sm"
                  />
                ) : (
                  transaction.content
                )}
              </td>

              <td
                onClick={() =>
                  handleEdit(transaction.id, "date", transaction.date)
                }
              >
                {editingId === transaction.id ? (
                  <input
                    type="date"
                    value={editedData.date ?? transaction.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    onBlur={() => handleSave(transaction.id)}
                    className="input input-sm"
                  />
                ) : (
                  transaction.date
                )}
              </td>

              <td
                onClick={() =>
                  handleEdit(transaction.id, "category", transaction.category)
                }
              >
                {editingId === transaction.id ? (
                  <input
                    type="text"
                    value={editedData.category ?? transaction.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    onBlur={() => handleSave(transaction.id)}
                    className="input input-sm"
                  />
                ) : (
                  transaction.category
                )}
              </td>

              <td
                onClick={() =>
                  handleEdit(transaction.id, "amount", transaction.amount)
                }
              >
                {editingId === transaction.id ? (
                  <input
                    type="number"
                    value={editedData.amount ?? transaction.amount}
                    onChange={(e) => handleChange("amount", e.target.value)}
                    onBlur={() => handleSave(transaction.id)}
                    className="input input-sm"
                  />
                ) : (
                  `${transaction.amount} ${
                    transaction.currency === "KRW" ? "원" : "元"
                  }`
                )}
              </td>

              <td>
                <select
                  value={editedData.currency ?? transaction.currency}
                  onChange={(e) => handleChange("currency", e.target.value)}
                  onBlur={() => handleSave(transaction.id)}
                  className="select select-sm"
                >
                  <option value="KRW">KRW</option>
                  <option value="CNY">CNY</option>
                </select>
              </td>

              <td
                onClick={() =>
                  handleEdit(
                    transaction.id,
                    "description",
                    transaction.description
                  )
                }
              >
                {editingId === transaction.id ? (
                  <input
                    type="text"
                    value={editedData.description ?? transaction.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    onBlur={() => handleSave(transaction.id)}
                    className="input input-sm"
                  />
                ) : (
                  transaction.description
                )}
              </td>

              <td>
                <select
                  value={editedData.type ?? transaction.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  onBlur={() => handleSave(transaction.id)}
                  className="select select-sm"
                >
                  <option value="INCOME">수입</option>
                  <option value="EXPENSE">지출</option>
                </select>
              </td>

              <td>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className="btn btn-sm btn-error"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TransactionsTable };
