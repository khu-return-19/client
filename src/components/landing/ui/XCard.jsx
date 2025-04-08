import React from "react";
import styles from "./XCard.module.scss";

function XCard() {
  return (
    <div className={styles.xCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>X축</span>
        <span className={styles.title}>학습수준</span>
      </div>
      <span className={styles.content}>
        지원자의 학습 역량을 파악해, <br />
        학문적 기반과 학술/연구 성과가 적절한지 확인
      </span>
    </div>
  );
}

export default XCard;
