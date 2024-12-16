import { useState } from "react";
import CalculatorChart from "../components/CalculatorChart";

const BudgetCalculator: React.FC = () => {
  const [budget, setBudget] = useState({
    savings: 0,
    food: 0,
    utilities: 0,
    housing: 0,
    transportation: 0,
    insurance: 0,
    household: 0,
    debt: 0,
    retirement: 0,
    personal: 0,
    other: 0,
  });

  const [income, setIncome] = useState<string | number>("");
  const [chartData, setChartData] = useState(budget);

  const moneyLeft =
    Number(income) -
    (chartData.savings +
      chartData.food +
      chartData.utilities +
      chartData.housing +
      chartData.transportation +
      chartData.insurance +
      chartData.household +
      chartData.debt +
      chartData.retirement +
      chartData.personal +
      chartData.other);

  const percentages = {
    savings: 0.1,
    food: 0.17,
    utilities: 0.06,
    housing: 0.25,
    transportation: 0.03,
    insurance: 0.11,
    household: 0.01,
    debt: 0.2,
    retirement: 0,
    personal: 0.07,
    other: 0,
  };

  const categoryColors = {
    savings: "#1D4ED8", // Deep blue
    food: "#EF4444", // Solid red
    utilities: "#10B981", // Solid green
    housing: "#F59E0B", // Solid yellow
    transportation: "#8B5CF6", // Purple
    insurance: "#3B82F6", // Light blue
    household: "#F87171", // Soft red
    debt: "#FACC15", // Bright yellow
    retirement: "#14B8A6", // Teal
    personal: "#D97706", // Orange
    other: "#6B7280", // Gray
  };

  const handleIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === "" ? "" : Number(e.target.value);
    setIncome(value);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const value = e.target.value === "" ? 0 : Number(e.target.value);
    setBudget({ ...budget, [type]: value });
  };

  const handleIncomeBlur = () => {
    if (Number(income) > 0) {
      const newBudget = Object.keys(percentages).reduce((acc, key) => {
        acc[key as keyof typeof budget] = Math.round(
          (income as number) * percentages[key as keyof typeof percentages]
        );
        return acc;
      }, {} as typeof budget);

      setBudget(newBudget);
      setChartData(newBudget);
    }
  };

  const handleBudgetBlur = () => {
    setChartData({ ...budget });
  };

  return (
    <div className="tracking-tight">
      <div className="text-center m-10">
        <p className="text-4xl font-bold">Budget Calculator</p>
        <p className="mt-3 text-xl">Welcome to the budget calculator where you can bla bla bla</p>
      </div>
      <div className="m-8 border-b-2 p-4">
        <p className="text-3xl font-semibold">Calculate your monthly expenses</p>
        <p className="mb-3 mt-2 tracking-tight">
          Input your post-tax monthly income into the income section and see where your money should be going
        </p>
        <p className="text-2xl font-bold mb-2">Income</p>
        <div>
          <div className="flex items-center gap-5">
            <label>Monthly Income (after taxes)</label>
            <div className="relative flex items-center">
              <span className="absolute inset-y-0 left-2 flex items-center text-black">$</span>
              <input
                type="number"
                value={income}
                onChange={handleIncomeChange}
                onBlur={handleIncomeBlur}
                className="border-2 border-black text-right pr-2 pl-8 w-28 rounded"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-8 m-8">
        <div>
          <p className="text-2xl font-bold mb-4 ml-3">Expenses</p>
          <ul>
            {Object.keys(budget).map((key) => (
              <li key={key} className="p-4 border-b-2">
                <div className="grid grid-cols-2 items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: categoryColors[key as keyof typeof categoryColors] }}
                    ></div>
                    <label className="text-left">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                  </div>
                  <div className="relative justify-self-end">
                    <input
                      type="number"
                      value={budget[key as keyof typeof budget] || ""}
                      onChange={(e) => handleInputChange(e, key)}
                      onBlur={handleBudgetBlur}
                      className="pl-8 border-2 border-black text-right w-28 pr-2 rounded"
                    />
                    <span className="absolute inset-y-0 left-2 flex items-center pointer-events-none">$</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <p className="text-2xl mt-6 ml-4 font-semibold">Income left: {moneyLeft}$</p>
        </div>

        <div className="flex justify-center items-center">
          <CalculatorChart
            savings={chartData.savings}
            food={chartData.food}
            utilities={chartData.utilities}
            housing={chartData.housing}
            transportation={chartData.transportation}
            insurance={chartData.insurance}
            household={chartData.household}
            debt={chartData.debt}
            retirement={chartData.retirement}
            personal={chartData.personal}
            other={chartData.other}
          />
        </div>
      </div>
    </div>
  );
};

export default BudgetCalculator;
