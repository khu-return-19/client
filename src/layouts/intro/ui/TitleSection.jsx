import React from "react";
import styles from "./TitleSection.module.scss";

function TitleSection() {
  return (
    <div className={styles.titleSection}>
      <div className={styles.title}>자기소개서 역량평가 AI</div>
      <div className={styles.content}>
        <span className={styles.contentText}>
          지원자의 자기소개서, 포트폴리오, 영상 데이터 등 다양한 자료를 AI 챗봇이 분석하여, <br />
          <span className={styles.color}>개인의 학습 능력(X축), 직무 적합성(Y축), 수행 역량(Z축)</span>을 종합 평가해
          주는 솔루션입니다.
          <br />
          <br />
          전통적인 2D 평가(지식 또는 기술 중심)에서 확장된 3D 평가 모델을 사용함으로써 <br />
          마인드셋, 직무 요구 역량, 프로젝트 수행 능력 등을 파악할 수 있습니다.
        </span>
      </div>
    </div>
  );
}

export default TitleSection;
