import React from "react";
import styles from "./VisualizationCard.module.scss";

function VisualizationCard() {
  return (
    <div className={styles.visualizationCard}>
      <span className={styles.title}>시각화</span>
      <span className={styles.content}>
        3D 그래프, 레이더 차트, 대시보드 등을 통해 한눈에 강·약점을 파악할 수 있도록 제공
      </span>
    </div>
  );
}

export default VisualizationCard;
