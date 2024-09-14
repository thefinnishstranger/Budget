import { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

const DonutChart = () => {
  const chartRef = useRef<ApexCharts | null>(null);

  // Function to get chart options
  const getChartOptions = () => {
    return {
      series: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100],
      colors: [
        "#1C64F2",  // Blue
        "#16BDCA",  // Cyan
        "#FDBA8C",  // Peach
        "#E74694",  // Pink
        "#F59E0B",  // Amber
        "#84CC16",  // Lime Green
        "#10B981",  // Teal
        "#6366F1",  // Purple
        "#F87171",  // Red
        "#D97706",  // Orange
        "#4B5563"   // Dark Gray
      ],
      chart: {
        height: 340,
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
                  return '$' + sum;
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
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    
    const chart = new ApexCharts(document.getElementById("donut-chart"), getChartOptions());
    chartRef.current = chart;
    chart.render();

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
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
