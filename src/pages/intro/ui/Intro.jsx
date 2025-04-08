import React from "react";
import styles from "./Intro.module.scss";
import {
  FeedbackLoopCard,
  AIAutoAnalysisCard,
  CareerTrendCard,
  PersonalizedFeedbackCard,
  CompanyRecruitCard,
  ConsultingCard,
  CompetencyManagementCard,
} from "components/intro";
import GoToMainButton from "components/shared/goToMainButton";

function Intro() {
  return (
    <div className={styles.intro}>
      <div className={styles.wrapper}>
        <div className={styles.titleSection}>
          <div className={styles.title}>자기소개서 역량평가 AI 챗봇</div>
          <div className={styles.content}>
            <span className={styles.contentText}>
              지원자의 자기소개서, 포트폴리오, 영상 데이터 등 다양한 자료를 AI 챗봇이 분석하여, <br />
              <span className={styles.color}>개인의 학습 능력(X축), 직무 적합성(Y축), 수행 역량(Z축)</span>을 종합
              평가해 주는 솔루션입니다.
              <br />
              <br />
              전통적인 2D 평가(지식 또는 기술 중심)에서 확장된 3D 평가 모델을 사용함으로써 <br />
              마인드셋, 직무 요구 역량, 프로젝트 수행 능력 등을 파악할 수 있습니다.
            </span>
            <img src="/introImage.png" alt="" className={styles.introImage} />
          </div>
        </div>

        <div className={styles.keyFeatures}>
          <span className={styles.title}>주요기능</span>
          <div className={styles.content}>
            <div className={styles.cardSection}>
              <FeedbackLoopCard />
              <AIAutoAnalysisCard />
            </div>
            <img src="main-features.png" alt="" className={styles.mainFeaturesImage} />
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

        <div className={styles.applicationCases}>
          <span className={styles.title}>적용 사례</span>
          <div className={styles.cardSection}>
            <CompanyRecruitCard />
            <ConsultingCard />
            <CompetencyManagementCard />
          </div>
        </div>
      </div>
      <GoToMainButton />
    </div>
  );
}

export default Intro;
