import { Filter } from "../types/filter";

interface FilterFormProps {
  filter: Filter | null;
  setFilter: (filter: Filter | null) => void;
  filterVisible: boolean;
  setFilterVisible: (visible: boolean) => void;
}

const FilterForm = ({
  filter,
  setFilter,
  filterVisible,
  setFilterVisible,
}: FilterFormProps) => {
  const handleFilterChange = (key: keyof Filter, value: any) => {
    const newFilter = { ...filter, [key]: value };
    setFilter(newFilter);
  };

  return (
    <div className="mb-6">
      <button
        className="btn btn-sm"
        onClick={() => setFilterVisible(!filterVisible)}
      >
        필터 {filterVisible ? "닫기" : "열기"}
      </button>

      {filterVisible && (
        <div className="mt-6 flex flex-wrap gap-6">
          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold mb-2">카테고리</label>
            <input
              type="text"
              placeholder="카테고리 필터"
              className="input input-bordered input-sm"
              onChange={(e) => handleFilterChange("category", e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold mb-2">금액 범위</label>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="최소 금액"
                className="input input-bordered input-sm"
                onChange={(e) =>
                  handleFilterChange("minAmount", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="최대 금액"
                className="input input-bordered input-sm"
                onChange={(e) =>
                  handleFilterChange("maxAmount", e.target.value)
                }
              />
            </div>
          </div>

          <div className="flex flex-col w-full md:w-1/3">
            <label className="text-sm font-semibold mb-2">날짜 범위</label>
            <div className="flex gap-2">
              <input
                type="date"
                className="input input-bordered input-sm"
                onChange={(e) =>
                  handleFilterChange("startDate", e.target.value)
                }
              />
              <input
                type="date"
                className="input input-bordered input-sm"
                onChange={(e) => handleFilterChange("endDate", e.target.value)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { FilterForm };
