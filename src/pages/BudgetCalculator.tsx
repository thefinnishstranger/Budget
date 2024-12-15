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

  console.log(moneyLeft);
  console.log(Number(income));
  console.log(chartData.other);
  
  
  

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
    other: 0
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
      // Update budget based on income
      const newBudget = Object.keys(percentages).reduce((acc, key) => {
        acc[key as keyof typeof budget] = Math.round(
          (income as number) * percentages[key as keyof typeof percentages]
        );
        return acc;
      }, {} as typeof budget);

      setBudget(newBudget); // Update budget
      setChartData(newBudget); // Update chart data to reflect the new budget
    }
  };

  const handleBudgetBlur = () => {
    setChartData({ ...budget }); // Update chart data when budget fields are edited
  };

  return (
    <div>
      <div className="text-center tracking-tight">
        <p className="text-3xl font-bold">Budget Calculator</p>
        <p>Welcome to the budget calculator where you can bla bla bla</p>
      </div>
      <div>
        <p className="text-2xl font-semibold">Calculate your monthly expenses</p>
        <p className="mb-5">
          Input your post-tax monthly income into the income section and see where your money should be going
        </p>
        <div>
          <input
            type="number"
            placeholder="Enter income"
            value={income}
            onChange={handleIncomeChange}
            onBlur={handleIncomeBlur}
            className="border border-solid border-black"
          />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <ul>
            {Object.keys(budget).map((key) => (
              <li key={key} className="p-4">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="number"
                  value={budget[key as keyof typeof budget] || ""}
                  onChange={(e) => handleInputChange(e, key)}
                  onBlur={handleBudgetBlur}
                  className="ml-10 border border-solid border-black"
                />
              </li>
            ))}
          </ul>
          <p className="text-2xl p-5 font-bold">Income left: {moneyLeft}$</p>
        </div>
        <div>
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
