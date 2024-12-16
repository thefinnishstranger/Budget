import FullYearSpending from "../components/FullYearSpending"
import MonthlySpendingChart from "../components/MonthlySpendingChart"


const AccountPage: React.FC = () => {
  return (
    <div>
      <div>
      <p className="text-center text-3xl font-bold p-8 tracking-tight">
        Monthly expenses
      </p>
      <p className="tracking-tight text-xl text-center">
        Hello account.name, here are your this month's expenses
      </p>
      </div>
      <div>
      <p className="text-center m-10">
        Chart
        <div>
          <MonthlySpendingChart />
        </div>
      </p>
      
      </div>
      <div className="grid grid-cols-2 m-10">
        <div>
        <p className="text-center justify-center">
        Your biggest spending categories
        </p>
        </div>
        <div>
        <p className="text-center justify-center">
        Your biggest purchases
        </p>
        </div>
      </div>
      <div>
        <p className="text-center text-3xl font-bold tracking-tight">
          Spending this year
        </p>
        <FullYearSpending />
      </div>
    </div>
  )
}

export default AccountPage
