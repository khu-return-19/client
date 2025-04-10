import React from "react";
import styles from "./Evaluation3D.module.scss";
import {
  XCard,
  YCard,
  ZCard,
  MultiModalAnalysisCard,
  DatabaseCard,
  VisualizationCard,
  CompetencyInsightCard,
  DXOptimizationCard,
  MotivationRiskCard,
} from "components/evaluation3D";
import GoToMainButton from "components/shared/goToMainButton";
import { useNavigate } from "react-router-dom";

function Evaluation3D() {
  const navigate = useNavigate();

  return (
    <div className={styles.evaluation3D}>
      <div className={styles.breadcrumb}>
        <span>서비스 소개</span>
        <div>></div>
        <span>3D 역량분석이란?</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.titleSection}>
          <span className={styles.title}>3D 역량분석이란?</span>
          <div className={styles.body}>
            <div className={styles.subtitle}>3D 모델의 구성</div>
            <div className={styles.content}>
              <img src="/3DEvaluation.png" alt="3D 역량 평가 이미지" className={styles.evaluationImage} />
              <div className={styles.xCard}>
                <XCard />
              </div>
              <div className={styles.yCard}>
                <YCard />
              </div>
              <div className={styles.zCard}>
                <ZCard />
              </div>
            </div>
          </div>
        </div>

        <div className={styles.evaluationMethod}>
          <div className={styles.title}>평가 방식</div>
          <div className={styles.content}>
            <MultiModalAnalysisCard />
            <DatabaseCard />
            <VisualizationCard />
          </div>
        </div>
        <div className={styles.utilizationValue}>
          <div className={styles.titleSection}>
            <div className={styles.title}>활용 가치</div>
            <div className={styles.content}>
              <CompetencyInsightCard />
              <MotivationRiskCard />
              <DXOptimizationCard />
            </div>
          </div>
          <div className={styles.description}>
            배경이론 <br />
            <br />
            Kolb(1984): 경험학습 이론(Experiential Learning)을 통해 학습 경험과 반성적 사고가 개인의 역량 향상에 긴밀히
            연결됨을 강조. <br />
            Dweck(2006): “Growth Mindset” 이론을 통해 개인이 학습과 도전에 임하는 태도(학습 수준, 성장 가능성)가 중요한
            성공 요소임을 시사.
            <br /> Holland, Boyatzis: 직무 적합성과 리더십, 성과 등 다양한 역량을 평가하는 여러 프레임워크를 제시.
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.title}>다른 글 더보기</div>
          <div className={styles.button}>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/intro");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>서비스 소개</span>
              <span className={styles.description}>자기소개서 역량평가 AI에 대한 전반적인 소개글과 활용 방안</span>
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

export default Evaluation3D;
