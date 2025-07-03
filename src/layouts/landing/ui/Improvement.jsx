import React from "react";
import styles from "./Improvement.module.scss";

function Improvement() {
  return (
    <>
      <div className={styles.titleSection}>
        <span className={styles.title}>개선방식 제안</span>
        <span className={styles.description}>합격자 비교분석 구직자의 장단점 소개 및 개선 전략 제공</span>
      </div>
      <div className={styles.cardSection}>
        <img src="/landing/accepted-analysis-card.png" alt="합격자 비교분석" className={styles.acceptedAnalysisCard} />
        <img src="/landing/strengths-card.png" alt="구직자의 장단점 평가" className={styles.strengthsCard} />
        <img src="/landing/strategy-card.png" alt="개선전략" className={styles.strategyCard} />
        <img src="/landing/final-score-card.png" alt="종합 평가/ 합격 가능성 평가" className={styles.finalScoreCard} />
      </div>
    </>
  );
}

export default Improvement;
