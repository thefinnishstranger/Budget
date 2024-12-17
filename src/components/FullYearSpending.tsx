import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const FullYearSpending: React.FC = () => {

  const currentYear = new Date().getFullYear();

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const generateChartData = (year: number) => {
    // Placeholder data generation logic
    // Replace this with real data fetching based on the year
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000 + year % 10));
  };


  useEffect(() => {
    const options = {
      series: [{ name: "Inflation", data: generateChartData(selectedYear) }],
      chart: { height: 350, type: "bar" },
      xaxis: { categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"] },
      title: { text: `Your monthly spending in ${currentYear}`, align: "center" },
    };

    const chart = new ApexCharts(document.querySelector("#yearly-chart"), options);
    chart.render();

    return () => chart.destroy();
  }, []);

  return (
    <div className="w-full bg-white p-4 md:p-6">
      <div id="yearly-chart" className="py-6"></div>
    </div>
  );
};

export default FullYearSpending;
