import React from "react";
import styles from "./FeedbackLoopCard.module.scss";

function FeedbackLoopCard() {
  return (
    <div className={styles.feedbackLoopCard}>
      <span className={styles.title}>재평가 루프</span>
      <span>
        3~6개월 간격으로 재평가를 실시해 역량 변화 추이를 파악,
        <br /> 목표치를 제시함으로써 지속 성장과 역량 고도화를 지원
      </span>
    </div>
  );
}

export default FeedbackLoopCard;
