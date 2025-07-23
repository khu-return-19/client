import React from "react";
import styles from "./IntroBigSize.module.scss";

function IntroBigSize({ onOpenModal }) {
  return (
    <div className={styles.intro}>
      <div className={styles.leftSection}>
        <span className={styles.title}>
          AI Pertineo가 해주는 <br />
          <span className={styles.color}>자기소개서 컨설팅</span>
        </span>
        <div className={styles.description}>
          <span className={styles.subTitle}>3D 역량 분석 보고서 제공</span>
          <span className={styles.text}>
            <strong>합격자 데이터</strong>로 학습된 인공지능 Pertineo를 통해 <br />
            3차원 역량 분석 결과를 확인하세요
            <br /> <br />
            <strong>경희대학교 웹메일</strong>로 보고서를 전송해요
          </span>
        </div>
        <div className={styles.analyzeButton} onClick={onOpenModal}>
          예시 레포트 보러가기
        </div>
      </div>
      <div className={styles.rightSection}>
        <img src="/landing/main.png" alt="" className={styles.mainImage} />
      </div>
    </div>
  );
}

export default IntroBigSize;
