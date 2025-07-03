import React from "react";
import styles from "./Evaluation.module.scss";
import { XCard, YCard, ZCard } from "components/landing";

function Evaluation() {
  return (
    <>
      <div className={styles.titleSection}>
        <span className={styles.title}>3D 역량평가 모델로 보는 세 가지 핵심 지표</span>
        <span className={styles.description}>
          당신의 학습 수준(X) · 직무적합 수준(Y) · 수행역량 수준(Z)을 정량 분석하여, 인터랙티브 3D 그래프로 시각화
        </span>
      </div>
      <div className={styles.content}>
        <img src="/shared/3D-evaluation.png" alt="3D 역량 평가 이미지" className={styles.evaluationImage} />
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
    </>
  );
}

export default Evaluation;
