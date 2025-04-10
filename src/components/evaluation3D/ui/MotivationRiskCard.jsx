import React from "react";
import styles from "./MotivationRiskCard.module.scss";

function MotivationRiskCard() {
  return (
    <div className={styles.motivationRiskCard}>
      <span className={styles.title}>학습동기 부여와 리스트 최소화</span>
      <span className={styles.content}>
        지원자·재직자 모두 현재 수준과 잠재력을 정확히 파악해 맞춤형 보완 학습을 진행할 수 있음
      </span>
    </div>
  );
}

export default MotivationRiskCard;
