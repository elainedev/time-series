import React from "react";
import {
  Chart as ChartJS,
  ChartOptions,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import "chartjs-adapter-luxon";
import { Line } from "react-chartjs-2";
import { TimeSeriesDataType } from "../types/types";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale
);

const LineGraph: React.FC<TimeSeriesDataType> = ({ data }) => {
  const chartData = {
    datasets: [
      {
        label: " Value: ",
        data,
        fill: false,
        backgroundColor: "maroon",
        pointBorderColor: "purple",
      },
    ],
  };

  const chartOptions: ChartOptions<"line"> = {
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          displayFormats: {
            hour: "H:mm",
          },
        },
        adapters: {
          date: {
            zone: "UTC",
          },
        },
        title: {
          display: true,
          text: "Time (UTC+0)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (context) =>
            `Time: ${new Date(context[0].parsed.x)
              .toISOString()
              .slice(11, 19)} UTC`,

          label: (context) => `${context.dataset.label}${context.parsed.y}`,
        },
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default LineGraph;
