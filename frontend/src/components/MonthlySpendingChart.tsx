import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import expenseService from "../services/expenseService.js";

interface MonthlySpendingChartProps {
  currentYear: number;
  currentMonth: number;
}

const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({ currentYear, currentMonth }) => {
  const getDaysInMonth = (year: number, month: number): number[] => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const [dailySpending, setDailySpending] = useState<number[]>([]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const thisMonthSpending = async () => {
    try {
      const response = await expenseService.getMonthlySpending(currentYear, currentMonth);
      const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  
      const spending = Array(daysInMonth.length).fill(0);
      response.forEach((expense: { day: number; total: number }) => {
        spending[expense.day - 1] = expense.total;
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
    const days = getDaysInMonth(currentYear, currentMonth);

    const options = {
      series: [
        {
          name: "Daily Spending",
          data: dailySpending
        },
      ],
      chart: { height: 500, type: "line", toolbar: { show: false } },
      stroke: { curve: "smooth" },
      title: { text: `Daily Spending for ${currentYear} - ${monthNames[currentMonth]}`, align: "left" },
      xaxis: { categories: days, title: { text: "Days of the Month" } },
      yaxis: { title: { text: "Amount Spent" } },
    };

    const chart = new ApexCharts(document.querySelector("#monthly-chart"), options);
    chart.render();

    // Cleanup on dependency change
    return () => chart.destroy();
  }, [currentYear, currentMonth]); // Added dependencies here

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <div id="monthly-chart" className="py-6"></div>
    </div>
  );
};

export default MonthlySpendingChart;
