import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const fullNames = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

const options: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 1000,
    easing: "easeOutBounce",
  },
  plugins: {
    legend: {
      display: true,
      position: "bottom",
      labels: {
        color: "oklch(79.2% 0.209 151.711)",
        boxWidth: 10,
        padding: 10,
        font: { size: 12 },
      },
    },
    tooltip: {
      enabled: true,
      callbacks: {
        label: (context: TooltipItem<"doughnut">) => {
          const value = Number(context.raw); // garantir número
          const name = fullNames[context.dataIndex] ?? context.label ?? "";
          const formatted =
            value >= 1_000_000_000
              ? (value / 1_000_000_000).toFixed(2) + "B"
              : value >= 1_000_000
              ? (value / 1_000_000).toFixed(2) + "M"
              : value.toString();
          return `${name}: ${formatted}`;
        },
      },
    },
  },
};

type Props = { 
  data: number[] 
};

export function Donut({data}: Props) {

  const dataDonut  = {
  labels: ["AFR", "ASI", "EUR", "NA", "SA", "OCE", "ANT"],
  datasets: [
    {
      data,
      backgroundColor: [
        "#f59e0b",
        "#3b82f6",
        "#10b981",
        "#8b5cf6",
        "#ef4444",
        "#f472b6",
        "#06b6d4",
      ],
      hoverOffset: 8,
      borderWidth: 0,
    },
  ],
};

  return <Doughnut data={dataDonut} options={options} />;
}