import { useEffect, useState } from "react";
import ApexCharts from "apexcharts";

const DonutChart = () => {
  // Function to get chart options
  const getChartOptions = () => {
    return {
      series: [35.1, 23.5, 2.4, 5.4],
      colors: ["#1C64F2", "#16BDCA", "#FDBA8C", "#E74694"],
      chart: {
        height: 320,
        width: "100%",
        type: "donut",
      },
      stroke: {
        colors: ["transparent"],
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: 20,
              },
              total: {
                showAlways: true,
                show: true,
                label: "Total spent",
                fontFamily: "Inter, sans-serif",
                formatter: function (w: any) {
                  const sum = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                  return '$' + sum + 'k';
                },
              },
              value: {
                show: true,
                fontFamily: "Inter, sans-serif",
                offsetY: -20,
                formatter: function (value: number) {
                  return value + "k";
                },
              },
            },
            size: "65%",
          },
        },
      },
      grid: {
        padding: {
          top: -2,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false
      },
    };
  };

  useEffect(() => {
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    chart.render();
  }, []);

  return (
    <div className="max-w-sm w-full bg-white p-4 md:p-6">
      <div className="flex justify-between mb-3">
        <div className="flex items-center">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white pe-1"></h5>
        </div>
      </div>

      <div>
        
      </div>

      {/* Donut Chart */}
      <div className="py-6" id="donut-chart"></div>
    </div>
  );
};

export default DonutChart;
