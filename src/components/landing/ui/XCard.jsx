import React from "react";
import styles from "./XCard.module.scss";

function XCard() {
  return (
    <div className={styles.xCard}>
      <div className={styles.title}>
        <div>X축</div>
        <div>학습수준</div>
      </div>
      <div className={styles.content}>
        지원자의 학습 역량을 파악해, <br />
        학문적 기반과 학술/연구 성과가 적절한지 확인
      </div>
    </div>
  );
}

export default XCard;
