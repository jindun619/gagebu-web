import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

type FormData = {
  content: string;
  date: string;
  category: string;
  amount: number;
  currency: "KRW" | "CNY";
  description?: string;
  type: "INCOME" | "EXPENSE";
};

const InsertForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: "onChange", // 입력할 때마다 유효성 검사
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setErrorMessage("");
      setSuccessMessage("");

      // 서버로 데이터 전송
      const response = await axios.post("/api/transactions", data);

      // 성공 메시지 출력
      setSuccessMessage("데이터가 성공적으로 제출되었습니다.");

      // 폼 초기화
      reset();
    } catch (error) {
      setErrorMessage("데이터 제출 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md"
    >
      {/* 내용 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">내용</label>
        <input
          type="text"
          {...register("content", { required: "내용은 필수 입력 항목입니다." })}
          className="input input-bordered w-full mt-2"
        />
        {errors.content && (
          <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>
        )}
      </div>

      {/* 날짜 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">날짜</label>
        <input
          type="date"
          {...register("date", { required: "날짜를 입력해주세요." })}
          className="input input-bordered w-full mt-2"
        />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
        )}
      </div>

      {/* 카테고리 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">
          카테고리
        </label>
        <input
          type="text"
          {...register("category", { required: "카테고리를 입력해주세요." })}
          className="input input-bordered w-full mt-2"
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
        )}
      </div>

      {/* 금액 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">금액</label>
        <input
          type="number"
          step="0.01"
          {...register("amount", {
            required: "금액을 입력해주세요.",
            min: { value: 0.01, message: "금액은 0보다 커야 합니다." },
          })}
          className="input input-bordered w-full mt-2"
        />
        {errors.amount && (
          <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      {/* 화폐 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">화폐</label>
        <select
          {...register("currency", { required: "화폐를 선택해주세요." })}
          className="select select-bordered w-full mt-2"
        >
          <option value="CNY">CNY</option>
          <option value="KRW">KRW</option>
        </select>
      </div>

      {/* 설명 (선택) */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">설명</label>
        <textarea
          {...register("description")}
          className="textarea textarea-bordered w-full mt-2"
          rows={4}
        ></textarea>
      </div>

      {/* 타입 선택 */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">타입</label>
        <select
          {...register("type", { required: "타입을 선택해주세요." })}
          className="select select-bordered w-full mt-2"
        >
          <option value="EXPENSE">지출</option>
          <option value="INCOME">수입</option>
        </select>
      </div>

      {/* 제출 버튼 (비활성화: 필수 값 없을 때) */}
      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={!isValid || loading}
      >
        {loading ? "제출 중..." : "Submit"}
      </button>

      {/* 성공/실패 메시지 */}
      {successMessage && (
        <p className="text-green-500 text-sm mt-2">{successMessage}</p>
      )}
      {errorMessage && (
        <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
      )}
    </form>
  );
};

export { InsertForm };
