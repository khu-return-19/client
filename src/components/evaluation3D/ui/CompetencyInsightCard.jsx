import React from "react";
import styles from "./CompetencyInsightCard.module.scss";

function CompetencyInsightCard() {
  return (
    <div className={styles.competencyInsightCard}>
      <span className={styles.title}>입체적 역량 파악</span>
      <span className={styles.content}>
        기존의 단순 필기·면접 평가가 아닌, 학습 태도·직무 핏·성과 역량 등을 복합적으로 측정하여 높은 신뢰도 확보
      </span>
    </div>
  );
}

export default CompetencyInsightCard;
