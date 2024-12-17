import React, { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

interface FullYearSpendingProps {
  selectedYear: number;
}

const FullYearSpending: React.FC<FullYearSpendingProps> = ({ selectedYear }) => {
  const generateChartData = (year: number) => {
    // Placeholder: Replace with actual year-based data fetching
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 1000 + year % 10));
  };

  useEffect(() => {
    const options = {
      series: [{ name: "Spending", data: generateChartData(selectedYear) }],
      chart: { height: 350, type: "bar" },
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
  }, [selectedYear]); // Re-run when `selectedYear` changes

  return <div id="yearly-chart" className="py-6"></div>;
};

export default FullYearSpending;
