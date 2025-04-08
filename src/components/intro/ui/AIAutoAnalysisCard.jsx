import React from "react";
import styles from "./AIAutoAnalysisCard.module.scss";

function AIAutoAnalysisCard() {
  return (
    <div className={styles.aIAutoAnalysisCard}>
      <span className={styles.title}>AI 기반 자동 분석</span>
      <span>
        NLP, 딥러닝 등을 통해 자기소개서와 이력서를 정량화, <br />
        3D 그래프나 대시보드로 결과를 시각화함
      </span>
    </div>
  );
}

export default AIAutoAnalysisCard;
