import React from "react";
import styles from "./PersonalizedFeedbackCard.module.scss";

function PersonalizedFeedbackCard() {
  return (
    <div className={styles.personalizedFeedbackCard}>
      <span className={styles.title}>맞춤형 피드백 및 실행 계획 제공</span>
      <span>
        X(학습 능력), Y(직무 적합성), Z축(수행 역량)의 평가 <br />
        기준에 따라 지원자 분석 및 개선방안 제공
      </span>
    </div>
  );
}

export default PersonalizedFeedbackCard;
