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
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "components/shared/breadcrumb";
import { TitleSection } from "layouts/intro";

function Intro() {
  const navigate = useNavigate();

  return (
    <div className={styles.intro}>
      <Breadcrumb paths={["서비스 소개"]} />
      <div className={styles.wrapper}>
        <TitleSection />
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

        <div className={styles.applicationCases}>
          <span className={styles.title}>적용 사례</span>
          <div className={styles.cardSection}>
            <CompanyRecruitCard />
            <ConsultingCard />
            <CompetencyManagementCard />
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.title}>서비스에 대해 더 구체적으로 알아보고 싶다면?</div>
          <div className={styles.button}>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/evaluation");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>3D 역량분석이란?</span>
              <span className={styles.description}>자기소개서 평가 모델의 세부적인 이론과 배경에 대한 설명</span>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/team");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>구성원</span>
              <span className={styles.description}>pertineo 제작 구성원을 소개</span>
            </div>
          </div>
        </div>
        <GoToMainButton />
      </div>
    </div>
  );
}

export default Intro;
