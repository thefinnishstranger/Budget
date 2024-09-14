import CalculatorChart from "../components/calculatorChart"

const inputs = [
  { type: 'Income' },
  { type: 'Savings' },
  { type: 'Food' },
  { type: 'Utilities' },
  { type: 'Housing' },
  { type: 'Transportation' },
  { type: 'Insurance' },
  { type: 'Household items' },
  { type: 'Debt' },
  { type: 'Retirement' },
  { type: 'Personal and Entertainment' },
  { type: 'Other' }
]

const BudgetCalculator: React.FC = () => {
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
            {inputs.map((input) => (
              <li key={input.type}>
                <label>{input.type}</label>
                <input type="text" placeholder={input.type} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <CalculatorChart />
        </div>

      </div>
    </div>
  )
}

export default BudgetCalculator
