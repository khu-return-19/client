import React from "react";
import styles from "./IntroSmallSize.module.scss";

function IntroSmallSize({ onOpenModal }) {
  return (
    <div className={styles.intro}>
      <div className={styles.leftSection}>
        <span className={styles.title}>
          자기소개서 분석을 통해 <br />
          <span className={styles.color}>합격 역량</span>을 파악해요
        </span>
        <div className={styles.description}>
          <span className={styles.subTitle}>1분 컷 무료 AI 3D역량평가 & 분석</span>
          <span className={styles.text}>
            합격자 빅데이터 기반의 3D역량평가를 통해 <br />
            <strong>직무역량분석</strong>과 <strong>개선된 자기소개서</strong>를 확인하세요
          </span>
        </div>
        <img src="/landing/main.png" alt="" className={styles.mainImage} />
        <div className={styles.imageButtonGroup}>
          <button className={`${styles.imageButton} `} />
        </div>
        <div className={styles.analyzeButton} onClick={onOpenModal}>
          예시 레포트 보러가기
        </div>
      </div>
    </div>
  );
}

export default IntroSmallSize;
