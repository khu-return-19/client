import React from "react";
import styles from "./DatabaseCard.module.scss";

function DatabaseCard() {
  return (
    <div className={styles.databaseCard}>
      <span className={styles.title}>데이터베이스 연동</span>
      <span className={styles.content}>
        기업 · 직무별로 필요한 역량 지표와 기존 합격자의 평균치를 참조해, 지원자의 (X, Y, Z) 점수를 상대 비교
      </span>
    </div>
  );
}

export default DatabaseCard;
