import React from "react";
import styles from "./MultiModalAnalysisCard.module.scss";

function MultiModalAnalysisCard() {
  return (
    <div className={styles.multiModalAnalysisCard}>
      <span className={styles.title}>다중 모달 데이터 분석</span>
      <span className={styles.content}>
        자기소개서 텍스트, 포트폴리오(코드, 디자인 시안 등), 영상(발표·인터뷰 영상) 데이터를 <br />
        NLP, 텍스트 마이닝, 컴퓨터 비전 기술로 분석해 정량적 점수를 산출
      </span>
    </div>
  );
}

export default MultiModalAnalysisCard;
