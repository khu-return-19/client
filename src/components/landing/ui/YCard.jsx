import React from "react";
import styles from "./YCard.module.scss";

function YCard() {
  return (
    <div className={styles.yCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>Y축</span>
        <span className={styles.title}>직무적합 수준 (Job Suitability Level)</span>
      </div>
      <div className={styles.content}>
        경험에 대한 <strong>직무핵심기술 · 조직문화</strong>의 일치도 평가
      </div>
    </div>
  );
}

export default YCard;
