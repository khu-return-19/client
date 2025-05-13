import React from "react";
import styles from "./ZCard.module.scss";

function ZCard() {
  return (
    <div className={styles.zCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>Z축</span>
        <span className={styles.title}>수행역량 수준 (Performance Competency Level)</span>
      </div>
      <span className={styles.content}>
        <strong>KPI · OKR 달성능력</strong>의 문제해결력 · 실행력 평가
      </span>
    </div>
  );
}

export default ZCard;
