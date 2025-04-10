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
        <span className={styles.highlight}>성장 마인드셋, 신기술 학습 속도, 학습 이력 등을 정량적으로 측정</span> <br />
        예) AI, 빅데이터 등 최신 기술을 얼마나 빠르게 학습하고 적용하는지, <br />
        실패 경험에서 얼마나 학습하는지
      </span>
    </div>
  );
}

export default XCard;
