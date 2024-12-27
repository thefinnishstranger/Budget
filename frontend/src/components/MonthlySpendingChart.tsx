import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import expenseService from "../services/expenseService.js";

interface MonthlySpendingChartProps {
  currentYear: number;
  currentMonth: number;
}

const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({ currentYear, currentMonth }) => {
  const [dailySpending, setDailySpending] = useState<number[]>([]);

  const getUserId = () => {
    const user = localStorage.getItem("loggedUser");
    if (!user) return null;

    const parsedUser = JSON.parse(user);
    return parsedUser.userId;
  };

  const getDaysInMonth = (year: number, month: number): number => {
    return new Date(year, month + 1, 0).getDate(); // Total days in month
  };

  const thisMonthSpending = async () => {
    try {
      const userId = getUserId();
      if (!userId) throw new Error("User ID not found.");

      const response = await expenseService.getMonthlySpending(userId, currentYear, currentMonth + 1);

      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
      const spending = Array(daysInMonth).fill(0); // Initialize array with 0s for each day

      // Populate spending array with data
      response.forEach((expense: { day: number; total: number }) => {
        spending[expense.day - 1] = parseFloat(expense.total.toFixed(2)); // 0-based index
      });

      setDailySpending(spending);
    } catch (error) {
      console.error("Error fetching this month's spending:", error);
      setDailySpending([]); // Fallback to empty data
    }
  };

  useEffect(() => {
    thisMonthSpending();
  }, [currentYear, currentMonth]);

  useEffect(() => {
    const days = Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => i + 1);

    const options = {
      series: [
        {
          name: "Daily Spending",
          data: dailySpending,
        },
      ],
      chart: { height: 500, type: "line", toolbar: { show: false } },
      stroke: { curve: "smooth" },
      title: { text: `Daily Spending for ${currentYear} - ${currentMonth + 1}`, align: "left" },
      xaxis: { categories: days, title: { text: "Days of the Month" } },
      yaxis: { title: { text: "Amount Spent" } },
    };

    const chartElement = document.querySelector("#monthly-chart");
    if (chartElement) {
      const chart = new ApexCharts(chartElement, options);
      chart.render();

      // Cleanup on dependency change
      return () => chart.destroy();
    }
  }, [dailySpending, currentYear, currentMonth]); // Trigger re-render when dailySpending updates

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <div id="monthly-chart" className="py-6"></div>
    </div>
  );
};

export default MonthlySpendingChart;
