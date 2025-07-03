import React from "react";
import styles from "./UtilizationValue.module.scss";
import { CompetencyInsightCard, DXOptimizationCard, MotivationRiskCard } from "components/evaluation3D";

function UtilizationValue() {
  return (
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
        Dweck(2006): “Growth Mindset” 이론을 통해 개인이 학습과 도전에 임하는 태도(학습 수준, 성장 가능성)가 중요한 성공
        요소임을 시사.
        <br /> Holland, Boyatzis: 직무 적합성과 리더십, 성과 등 다양한 역량을 평가하는 여러 프레임워크를 제시.
      </div>
    </div>
  );
}

export default UtilizationValue;
