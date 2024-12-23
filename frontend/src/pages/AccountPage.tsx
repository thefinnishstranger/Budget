import { useEffect, useState } from "react";
import FullYearSpending from "../components/FullYearSpending";
import MonthlySpendingChart from "../components/MonthlySpendingChart";
import ExpenseInput from "../components/ExpenseInput";

const AccountPage: React.FC = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const currentYear = new Date().getFullYear();
  const currentMonthNumber = new Date().getMonth();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonthNumber);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedYear === currentYear) {
      setSelectedMonth(currentMonthNumber);
    } else {
      setSelectedMonth(0);
    }
  }, [selectedYear, currentYear, currentMonthNumber]);

  return (
    <div className="bg-white min-h-screen">

      {/* Introduction Section */}
      <div className="p-10 text-center grid grid-cols-2 shadow-md">

        <div className="p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Welcome to Your Dashboard, account.name!
        </h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Manage your finances efficiently. Track your monthly expenses, review your top spending categories, and gain insights into your financial health.
        </p>
        </div>
        <div className="p-8 text-center rounded-lg mt-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Add a New Expense
        </h2>
        <p className="text-gray-600 mt-2">
          Keeping track of your spending is simple. Add an expense to stay on top of your budget.
        </p>
        <button
          type="button"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg mt-4 hover:bg-blue-600 shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add Expense
        </button>
        {isModalOpen && (
          <ExpenseInput onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      </div>

      {/* Add Expense Section */}
      

      {/* Monthly Spending Overview */}
      <div className="text-center p-8 mt-8">
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Monthly Spending Overview
        </h1>
        <p className="text-lg text-gray-600 mt-3">
          Here's a detailed breakdown of your expenses for{" "}
          <span className="font-semibold text-blue-600">
            {monthNames[selectedMonth]} {selectedYear}
          </span>.
        </p>
      </div>

      {/* Month Selector */}
      <div className="flex justify-center mb-8">
        <label className="text-lg font-semibold mr-3 text-gray-700">Select Month:</label>
        <select
          className="border-2 border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {monthNames.map((month, index) => (
            <option
              key={index}
              value={index}
              disabled={selectedYear === currentYear && index > currentMonthNumber}
            >
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Chart */}
      <div className="w-full max-w-7xl mx-auto">
        <MonthlySpendingChart currentYear={selectedYear} currentMonth={selectedMonth} />
      </div>

      {/* Biggest Spending Categories and Purchases */}
      <div className="shadow-md grid grid-cols-1 md:grid-cols-2 bg-slate-100 p-8 mt-24 rounded-lg shadow-sm">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Top Spending Categories
          </h2>
          <ul className=" text-lg space-y-2">
            <li>1. Housing</li>
            <li>2. Food & Dining</li>
            <li>3. Transportation</li>
            <li>4. Utilities</li>
            <li>5. Entertainment</li>
          </ul>
        </div>
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Top Purchases</h2>
          <ul className=" text-lg space-y-2">
            <li>1. New Laptop</li>
            <li>2. Car Insurance</li>
            <li>3. Monthly Rent</li>
            <li>4. Groceries</li>
            <li>5. Phone Bill</li>
          </ul>
        </div>
      </div>

      {/* Year Selector and Full Year Spending */}
      <div className="text-center mt-24">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Spending Summary for {selectedYear}
        </h2>
        <div className="inline-block">
          <label className="text-lg font-semibold mr-2">Select Year:</label>
          <select
            className="border-2 border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => currentYear - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-6 mb-20 w-full max-w-7xl mx-auto">
          <FullYearSpending selectedYear={selectedYear} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
