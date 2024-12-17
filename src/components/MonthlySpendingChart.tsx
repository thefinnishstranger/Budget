import { useEffect } from "react";
import ApexCharts from "apexcharts";


const MonthlySpendingChart: React.FC = () => {
  const getDaysInMonth = (year: number, month: number): number[] => {
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  }

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const days = getDaysInMonth(currentYear, currentMonth);
    
    const options = {
      series: [
        { name: "Daily spending", data: days.map(() => Math.floor(Math.random() * 1000)) },
      ],
      chart: { height: 350, type: "line", toolbar: { show: false } },
      stroke: { curve: "smooth" },
      title: { text: "Daily spending", align: "left" },
      xaxis: { categories: days },
    };

    const chart = new ApexCharts(document.querySelector("#monthly-chart"), options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <div id="monthly-chart" className="py-6"></div>
    </div>
  );
};

export default MonthlySpendingChart;
