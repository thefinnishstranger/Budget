import { useEffect } from "react";
import ApexCharts from "apexcharts";

interface MonthlySpendingChartProps {
  currentYear: number;
  currentMonth: number;
}

const MonthlySpendingChart: React.FC<MonthlySpendingChartProps> = ({ currentYear, currentMonth }) => {
  const getDaysInMonth = (year: number, month: number): number[] => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const days = getDaysInMonth(currentYear, currentMonth);

    const options = {
      series: [
        {
          name: "Daily Spending",
          data: days.map(() => Math.floor(Math.random() * 1000)), // Replace with real data fetching logic
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
