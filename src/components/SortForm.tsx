interface SortFormProps {
  handleSortChange: (
    sortBy: "date" | "amount",
    direction: "asc" | "desc"
  ) => void;
}

const SortForm = ({ handleSortChange }: SortFormProps) => {
  return (
    <div className="mb-6 flex gap-6">
      <div>
        <label className="text-sm font-semibold">정렬 기준</label>
        <div className="flex gap-4">
          <button
            className="btn btn-sm"
            onClick={() => handleSortChange("date", "asc")}
          >
            날짜 ↑
          </button>
          <button
            className="btn btn-sm"
            onClick={() => handleSortChange("date", "desc")}
          >
            날짜 ↓
          </button>
          <button
            className="btn btn-sm"
            onClick={() => handleSortChange("amount", "asc")}
          >
            금액 ↑
          </button>
          <button
            className="btn btn-sm"
            onClick={() => handleSortChange("amount", "desc")}
          >
            금액 ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export { SortForm };
