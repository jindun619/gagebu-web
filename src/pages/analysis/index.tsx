import { useEffect, useState } from "react";
import SimplePieChart from "../../components/charts/SimplePieChart";
import { CategoryTotalAmount, DataPoint } from "../../types";
import { fetchCategoryWiseTotalAmount } from "../../utils/fetch";
import { convertToDataPoint } from "../../utils/convert";

const AnalysisPage = () => {
  const [categoryTotalAmount, setCategoryTotalAmount] = useState<
    CategoryTotalAmount[]
  >([]);
  const [data, setData] = useState<DataPoint[]>([]);

  const loadCategoryTotalAmount = async () => {
    const data = await fetchCategoryWiseTotalAmount();
    setCategoryTotalAmount(data);
  };

  useEffect(() => {
    loadCategoryTotalAmount();
  }, []);

  useEffect(() => {
    setData(convertToDataPoint(categoryTotalAmount));
  }, [categoryTotalAmount]);

  return (
    <div className="border p-4">
      <SimplePieChart data={data} currency="CNY" />
    </div>
  );
};

export default AnalysisPage;
