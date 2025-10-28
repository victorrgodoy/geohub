import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const fullNames = [
  "Africa",
  "Asia",
  "Europe",
  "North America",
  "South America",
  "Oceania",
  "Antarctica",
];

const data = {
  labels: ["AFR", "ASI", "EUR", "NA", "SA", "OCE", "ANT"],
  datasets: [
    {
      label: "Population",
      data: [1410000000, 4660000000, 748000000, 600000000, 430000000, 43000000, 1000],
      backgroundColor: [
        "#f59e0b","#3b82f6","#10b981","#8b5cf6","#ef4444","#f472b6","#06b6d4",
      ],
    },
  ],
};

export default function BarChart() {
 const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { 
      display: false 
    },
    tooltip: { 
      enabled: true,
        callbacks: {
          label: (context) => {
            const fullName = fullNames[context.dataIndex]; 
            const value = context.raw;
            const formatted = (value / 1_000_000_000).toFixed(2) + "B";
            return fullName + ": " + formatted;
          }
        }
    }
  },
  scales: {
    x: {
      ticks: {
        font: { size: 12 },
        color: "#FFF",
      },
    },
    y: {
      ticks: {
        font: { size: 12 },
        color: "#FFF",
        callback: (value) => (value / 1_000_000_000).toFixed(1) + "B",
      },
      beginAtZero: true
    },
  },
  animation: {
    duration: 1000,
    easing: "easeOutBounce",
  },
};

  return (
    <div style={{ width: "100%", height: 350 }}> 
      <Bar data={data} options={options} />
    </div>
  );
}