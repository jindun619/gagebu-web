import { CategoryTotalAmount, DataPoint } from "../types";

export const convertToDataPoint = (
  cta: CategoryTotalAmount[],
  groupSmallValues: boolean = true
): DataPoint[] => {
  const total: number = cta.reduce((acc, item) => acc + item.totalAmount, 0);
  const result: DataPoint[] = [];
  const others: DataPoint = { name: "Others", value: 0 };

  cta.map((item) => {
    if (groupSmallValues && item.totalAmount / total < 0.05) {
      others.value = Number((others.value + item.totalAmount).toFixed(2));
    } else {
      result.push({ name: item.category, value: item.totalAmount });
    }
  });
  if (others.value > 0) {
    result.push(others);
  }

  return result;
};
