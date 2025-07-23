import React from "react";
import styles from "./TitleSection.module.scss";

function TitleSection() {
  return (
    <div className={styles.titleSection}>
      <div className={styles.title}>Pertineo : 합격자 데이터 기반 자기소개서 분석 AI </div>
      <div className={styles.content}>
        <span className={styles.contentText}>
          지원자가 제공한 정보(자기소개서, 전공, 학점 등),
          <span className={styles.color}> 합격자 데이터</span>, 실시간
          <span className={styles.color}> 웹 서치 </span>정보를 바탕으로 <br />
          개인의 학습 능력(X축), 직무 적합성(Y축), 수행 역량(Z축)을 종합 평가해 주는 솔루션입니다.
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
