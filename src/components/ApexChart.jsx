import React from "react";
import Chart from "react-apexcharts";

export default function ApexChart({
  type = "line",
  height = 300,
  width = "100%",
  categories = [],
  series = [],
  options = {},
}) {
  const defaultOptions = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      foreColor: "#ffffff",
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    grid: {
      borderColor: "rgba(255,255,255,0.1)",
      strokeDashArray: 4,
    },
    xaxis: {
      categories,
      labels: {
        style: { colors: "#aaa" },
      },
    },
    yaxis: {
      labels: {
        style: { colors: "#aaa" },
      },
    },
    legend: {
      labels: {
        colors: "#fff",
      },
    },
    ...options,
  };

  return (
    <Chart
      type={type}
      height={height}
      width={width}
      options={defaultOptions}
      series={series}
    />
  );
}
