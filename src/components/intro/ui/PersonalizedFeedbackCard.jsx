import React from "react";
import styles from "./PersonalizedFeedbackCard.module.scss";

function PersonalizedFeedbackCard() {
  return (
    <div className={styles.personalizedFeedbackCard}>
      <span className={styles.title}>맞춤형 피드백 및 실행 계획 제공</span>
      <span>
        WEF 보고서, LinkedIn 등에서 수집한 <br />
        최신 채용 트렌드를 토대로 평가 기준 자동 업데이트
      </span>
    </div>
  );
}

export default PersonalizedFeedbackCard;
