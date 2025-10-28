import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, layouts } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const fullNames = [
  "Africa", 
  "Asia", 
  "Europe", 
  "North America", 
  "South America", 
  "Oceania", 
  "Antarctica"
];

const data = {
  labels: ["AFR", "ASI", "EUR", "NA", "SA", "OCE", "ANT"],
  datasets: [
    {
      data: [
        1410000000, // Africa
        4660000000, // Asia
        748000000,  // Europe
        600000000,  // North America
        430000000,  // South America
        43000000,   // Oceania
        1000        // Antarctica
      ],
      backgroundColor: [
        "#f59e0b", // Africa
        "#3b82f6", // Asia
        "#10b981", // Europe
        "#8b5cf6", // North America
        "#ef4444", // South America
        "#f472b6", // Oceania
        "#06b6d4"  // Antarctica
      ],
      hoverOffset: 8,
      borderWidth: 0,
    },
  ],
};

export default function Donut() {
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
    animation: { duration: 1000, easing: "easeOutBounce" },
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "oklch(70.213% 0.18467 151.859)",
          boxWidth: 10,
          padding: 10,
          font: { size: 12 },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const fullName = fullNames[context.dataIndex];
            const value = context.raw;
            let formatted =
              value >= 1_000_000_000
                ? (value / 1_000_000_000).toFixed(2) + "B"
                : value >= 1_000_000
                ? (value / 1_000_000).toFixed(2) + "M"
                : value;
            return `${fullName}: ${formatted}`;
          },
        },
      },
    },
  };

  return <Doughnut width={100} height={100} data={data} options={options} />;
}