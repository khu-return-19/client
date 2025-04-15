import React from "react";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import styles from "./RadarChart.module.scss";

// Chart.js 모듈 등록
ChartJS.register(
  RadialLinearScale,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

function RadarChart({ x, y, z }) {
  const data = {
    labels: ["X축", "Y축", "Z축"], // 각 축 이름
    datasets: [
      {
        label: "XYZ", // 데이터 이름
        data: [x, y, z], // 데이터 값
        backgroundColor: "rgba(34, 202, 236, 0.2)", // 배경색
        borderColor: "rgba(34, 202, 236, 1)", // 테두리 색
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        min: 0,
        max: 5,
        ticks: {
          display: false,
          stepSize: 1, // 간격 설정
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      datalabels: {
        color: "black",
        font: {
          weight: "bold",
        },
        formatter: (value) => value.toFixed(1),
        anchor: "end",
        align: "start",
      },
    },
  };

  return (
    <div className={styles.RadarChart}>
      <Radar data={data} options={options} />
    </div>
  );
}

export default RadarChart;
