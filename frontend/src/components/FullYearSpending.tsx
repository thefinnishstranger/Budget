import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";
import expenseService from "../services/expenseService";

interface FullYearSpendingProps {
  selectedYear: number;
}

const FullYearSpending: React.FC<FullYearSpendingProps> = ({ selectedYear }) => {
  const [spending, setSpending] = useState<number[]>(Array(12).fill(0)); // Initialize with 12 months of 0 spending

  const getUserId = (): string | null => {
    const user = localStorage.getItem("loggedUser");
    if (!user) return null;
    const parsedUser = JSON.parse(user);
    return parsedUser?.userId || null;
  };

  const fetchYearlySpending = async () => {
    try {
      const userId = getUserId();
      if (!userId) throw new Error("User ID not found.");

      const response = await expenseService.getYearlySpending(userId, selectedYear);

      const updatedSpending = Array(12).fill(0); // Reset spending array
      response.forEach((expense: { month: number; total: number }) => {
        updatedSpending[expense.month - 1] = expense.total; // Map API data to months (1-based to 0-based index)
      });

      setSpending(updatedSpending); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching yearly spending:", error);
    }
  };

  useEffect(() => {
    fetchYearlySpending(); // Fetch spending data when the selected year changes
  }, [selectedYear]);

  useEffect(() => {
    const options = {
      series: [{ name: "Spending", data: spending }],
      chart: { height: 500, type: "bar" },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      },
      title: {
        text: `Your Monthly Spending in ${selectedYear}`,
        align: "center",
      },
    };

    const chart = new ApexCharts(document.querySelector("#yearly-chart"), options);
    chart.render();

    return () => chart.destroy(); // Clean up the chart on year change
  }, [spending]); // Re-run when `spending` updates

  return <div id="yearly-chart" className="py-6"></div>;
};

export default FullYearSpending;
