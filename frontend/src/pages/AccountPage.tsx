import { useEffect, useState } from "react";
import FullYearSpending from "../components/FullYearSpending";
import MonthlySpendingChart from "../components/MonthlySpendingChart";
import ExpenseInput from "../components/ExpenseInput";
import expenseService from "../services/expenseService";
import { MonthlyDetails } from "../services/expenseService";

const AccountPage: React.FC = () => {
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const [chartRefresh, setChartRefresh] = useState(false);

  const handleExpenseAdded = () => {
    setChartRefresh((prev) => !prev);
  }
  
  const years = [2020, 2021, 2022, 2023, 2024, 2025];

  const currentYear = new Date().getFullYear();
  const currentMonthNumber = new Date().getMonth();

  if (years[years.length - 1] !== currentYear) {
    years.push(currentYear);
  }

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonthNumber);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [topCategories, setTopCategories] = useState<{ category: string; total: number }[]>([]);
  const [biggestPurchases, setBiggestPurchases] = useState<{ description: string; cost: number; date: string }[]>([]);


  const getUserId = ():string | null => {
    const user = localStorage.getItem("loggedUser");
    if (!user) {
      return null
    }
    const parsedUser = JSON.parse(user);
    return parsedUser.userId;
  }  

  // Update fetchMonthlyInsights
const fetchMonthlyInsights = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error("User ID not found.");
    }

    const expenses: MonthlyDetails[] = await expenseService.getMonthlyDetails(
      userId,
      selectedYear,
      selectedMonth + 1
    );

    // Calculate category totals
    const categoryTotals: Record<string, number> = {};
    expenses.forEach((expense) => {
      categoryTotals[expense.category] =
        (categoryTotals[expense.category] || 0) + expense.cost;
    });

    // Get top categories with totals
    const sortedCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([category, total]) => ({ category, total }));

    setTopCategories(sortedCategories);

    // Get top purchases with date
    const sortedPurchases = expenses
      .sort((a, b) => b.cost - a.cost)
      .slice(0, 5)
      .map((expense) => ({
        description: expense.category,
        cost: expense.cost,
        date: new Date(expense.date).toLocaleDateString(),
      }));

    setBiggestPurchases(sortedPurchases);
  } catch (error) {
    console.error("Error fetching monthly insights:", error);
  }
};

const getUsername = () => {
  const user = localStorage.getItem("loggedUser");
  if (!user) return "stranger";
  console.log(JSON.parse(user).token);
  return JSON.parse(user).name;
}
  
  

  useEffect(() => {
    fetchMonthlyInsights();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth, currentYear, currentMonthNumber])

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
      <div className="p-2 md:p-10 text-center grid grid-cols-1 md:grid-cols-2 shadow-md">

        <div className="p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-tight">
          Welcome to Your Dashboard, {getUsername()}
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
          <ExpenseInput onClose={() => setIsModalOpen(false)} onExpenseAdded={handleExpenseAdded} />
        )}
      </div>
      </div>

      {/* Add Expense Section */}
      

      {/* Monthly Spending Overview */}
      <div className="text-center p-4 md:p-8 mt-8">
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
      <div className="flex flex-col md:flex-row justify-center mb-8 m-10 md:m-0">
        <label className="text-lg font-semibold mr-3 text-gray-700 mb-4 md:mb-0">Select Month and Year:</label>
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
        <select
          className="border-2 border-gray-300 rounded px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4 md:mt-0"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
        >
          {years.map((year, index) => (
            <option
              key={index}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Monthly Chart */}
      <div className="w-full max-w-7xl mx-auto">
        <MonthlySpendingChart currentYear={selectedYear} currentMonth={selectedMonth} chartRefresh={chartRefresh} />
      </div>

      {/* Biggest Spending Categories and Purchases */}
      <div className="shadow-md grid grid-cols-1 gap-8 bg-slate-100 p-4 md:p-8 mt-16 rounded-lg">
      <div className="p-6 text-center bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-bold mb-7 text-gray-800">
    Top Spending Categories in {monthNames[selectedMonth]}
  </h2>
  <ul className="space-y-4">
    {topCategories.map((categoryData, index) => (
      <li
        key={index}
        className="flex justify-between items-center p-4 border border-gray-200 rounded-lg"
      >
        <span className="font-medium text-lg text-gray-700">
          {categoryData.category}
        </span>
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold">
          ${categoryData.total.toFixed(2)}
        </span>
      </li>
    ))}
  </ul>
</div>


<div className="p-6 text-center bg-white rounded-lg shadow-md">
  <h2 className="text-3xl font-bold mb-7 text-gray-800">
    Top Purchases in {monthNames[selectedMonth]}
  </h2>
  <ul className="space-y-4">
    {biggestPurchases.map((purchase, index) => (
      <li
        key={index}
        className="flex flex-col md:flex-row justify-between items-center p-4 border border-gray-200 rounded-lg"
      >
        <div className="flex items-center space-x-4">
          <div>
            <p className="font-medium text-lg text-gray-700">{purchase.description}</p>
            <p className="text-sm text-gray-500">Purchased on {purchase.date}</p>
          </div>
        </div>
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold mt-3 md:mt-0">
          ${purchase.cost.toFixed(2)}
        </span>
      </li>
    ))}
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
          <FullYearSpending selectedYear={selectedYear} chartRefresh={chartRefresh} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
