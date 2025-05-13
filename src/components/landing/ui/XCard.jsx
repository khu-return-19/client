import React from "react";
import styles from "./XCard.module.scss";

function XCard() {
  return (
    <div className={styles.xCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>X축</span>
        <span className={styles.title}>학습수준(Learning Level)</span>
      </div>
      <span className={styles.content}>
        지식 · 연구 · 실무 학습의 <strong>깊이 · 난이도 · 신규성</strong> 평가
      </span>
    </div>
  );
}

export default XCard;
