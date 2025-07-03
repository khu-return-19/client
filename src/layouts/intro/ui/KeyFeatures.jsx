import React from "react";
import styles from "./KeyFeatures.module.scss";
import { FeedbackLoopCard, AIAutoAnalysisCard, CareerTrendCard, PersonalizedFeedbackCard } from "components/intro";

function KeyFeatures() {
  return (
    <div className={styles.keyFeatures}>
      <span className={styles.title}>주요기능</span>
      <div className={styles.content}>
        <div className={styles.cardSection}>
          <FeedbackLoopCard />
          <AIAutoAnalysisCard />
        </div>
        <img src="/intro/main-features.png" alt="" className={styles.mainFeaturesImage} />
        <div className={styles.cardSection}>
          <CareerTrendCard />
          <PersonalizedFeedbackCard />
        </div>
        <span className={styles.contentText}>
          X축(학습 능력): 추천 강의, 학습 플랫폼 안내(Coursera, edX 등)
          <br /> Y축(직무 적합성): 직무 맞춤형 프로젝트나 멘토링 프로그램 연결
          <br /> Z축(수행 역량): Kaggle, 해커톤, 실무 프로젝트 참여 기회 제안
        </span>
      </div>
    </div>
  );
}

export default KeyFeatures;
