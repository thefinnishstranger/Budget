import { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

interface BudgetCategories {
    savings: number;
    food: number;
    utilities: number;
    housing: number;
    transportation: number;
    insurance: number;
    household: number;
    debt: number;
    retirement: number;
    personal: number;
    other: number;
  }

  const DonutChart = ({ savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other }: BudgetCategories) => {
    const chartRef = useRef<ApexCharts | null>(null);
  
    const convertToNumber = (value: any) => {
      return value === "" || isNaN(Number(value)) ? 0 : Number(value);
    };
  
    const getChartOptions = (categories: BudgetCategories): ApexOptions => {
      return {
        series: [
          convertToNumber(categories.savings),
          convertToNumber(categories.food),
          convertToNumber(categories.utilities),
          convertToNumber(categories.housing),
          convertToNumber(categories.transportation),
          convertToNumber(categories.insurance),
          convertToNumber(categories.household),
          convertToNumber(categories.debt),
          convertToNumber(categories.retirement),
          convertToNumber(categories.personal),
          convertToNumber(categories.other),
        ],
        labels: [
          "Savings", "Food", "Utilities", "Housing",
          "Transportation", "Insurance", "Household",
          "Debt", "Retirement", "Personal", "Other"
        ],
        colors: [
  "#1D4ED8", // Deep blue
  "#EF4444", // Solid red
  "#10B981", // Solid green
  "#F59E0B", // Solid yellow
  "#8B5CF6", // Purple
  "#3B82F6", // Light blue
  "#F87171", // Soft red
  "#FACC15", // Bright yellow
  "#14B8A6", // Teal
  "#D97706", // Orange
  "#6B7280", // Gray
],
        chart: {
          height: 500,
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
                  fontFamily: "Helvetica, Arial, sans-serif",
                  fontSize: '20px',
                  formatter: function (w: any) {
                    const sum = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
                    return '$' + sum;
                  },
                },
                value: {
                  show: true,
                  fontFamily: "Inter, sans-serif",
       
                  fontSize: '24px',
                  offsetY: -20,
                  formatter: function (val: string) {
                    return `$${parseFloat(val).toFixed(2)}`;
                  },
                },
              },
              size: "50%",
            },
          },
        },
        grid: {
          padding: {
            top: -2,
          },
        },
        dataLabels: {
          enabled: true,
          style: {
            fontSize: '16px',
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 'none'
          }
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
      
      const chart = new ApexCharts(
        document.getElementById("donut-chart"),
        getChartOptions({ savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other })
      );
      chartRef.current = chart;
      chart.render();
  
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other]);
  
    return (
      <div className="w-full bg-white p-4 md:p-6">
        <div className="py-6" id="donut-chart"></div>
      </div>
    );
  };
  
  export default DonutChart;
  