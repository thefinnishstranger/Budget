import { useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";

interface BudgetCategories {
    income: number;
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

  const DonutChart = ({ income, savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other }: BudgetCategories) => {
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
          "savings", "food", "utilities", "housing",
          "transportation", "insurance", "household",
          "debt", "retirement", "personal", "other"
        ],
        colors: [
          "#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#F59E0B", "#84CC16", "#10B981",
          "#6366F1", "#F87171", "#D97706", "#4B5563"
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
      
      const chart = new ApexCharts(
        document.getElementById("donut-chart"),
        getChartOptions({ income, savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other })
      );
      chartRef.current = chart;
      chart.render();
  
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy();
        }
      };
    }, [income, savings, food, utilities, housing, transportation, insurance, household, debt, retirement, personal, other]);
  
    return (
      <div className="max-w-sm w-full bg-white p-4 md:p-6">
        <div className="py-6" id="donut-chart"></div>
      </div>
    );
  };
  
  export default DonutChart;
  