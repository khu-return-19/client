import React from "react";
import styles from "./TitleSection.module.scss";
import { XCard, YCard, ZCard } from "components/evaluation3D";

function TitleSection() {
  return (
    <div className={styles.titleSection}>
      <span className={styles.title}>3D 역량분석이란?</span>
      <div className={styles.body}>
        <div className={styles.subtitle}>3D 모델의 구성</div>
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
      </div>
    </div>
  );
}

export default TitleSection;
