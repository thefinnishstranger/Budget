import { useState } from "react"
import CalculatorChart from "../components/calculatorChart"

const BudgetCalculator: React.FC = () => {
  const [budget, setBudget] = useState({
    income: 0,
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
  })
  
  const moneyLeft = budget.income - (
    budget.savings + budget.food + budget.utilities + budget.housing +
    budget.transportation + budget.insurance + budget.household +
    budget.debt + budget.retirement + budget.personal + budget.other
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    const value = e.target.value === "" ? "" : Number(e.target.value)
    setBudget({...budget, [type]: value})
  }

  return (
    <div>
      <div className="text-center tracking-tight">
        <p className="text-3xl font-bold">
          Budget Calculator
        </p>
        <p >
          Welcome to the budget calculator where you can bla bla bla
        </p>
      </div>
      <div>
        <p className="text-2xl font-semibold">
          Calculate your monthly expenses
        </p>
        <p className="mb-5">
          Input your post-tax monthly income into the income section and see where your money should be going
        </p>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <ul>
            {Object.keys(budget).map((key) => (
              <li key={key} className="p-4">
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
                <input
                  type="number"
                  value={budget[key as keyof typeof budget]}
                  onChange={(e) => handleInputChange(e, key)}
                  className="ml-10 border border-solid border-black"
                  
                />
              </li>
            ))}
          </ul>
          <p className="text-2xl p-5 font-bold">
            Income left: {moneyLeft}$
          </p>
        </div>
        <div>
        <CalculatorChart
            income={budget.income}
            savings={budget.savings}
            food={budget.food}
            utilities={budget.utilities}
            housing={budget.housing}
            transportation={budget.transportation}
            insurance={budget.insurance}
            household={budget.household}
            debt={budget.debt}
            retirement={budget.retirement}
            personal={budget.personal}
            other={budget.other}
          />
        </div>
      </div>
    </div>
  )
}

export default BudgetCalculator
