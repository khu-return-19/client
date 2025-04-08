import React from "react";
import styles from "./CareerTrendCard.module.scss";

function CareerTrendCard() {
  return (
    <div className={styles.careerTrendCard}>
      <span className={styles.title}>미래 직업 동향 반영</span>
      <span>
        WEF 보고서, LinkedIn 등에서 수집한 <br />
        최신 채용 트렌드를 토대로 평가 기준 자동 업데이트
      </span>
    </div>
  );
}

export default CareerTrendCard;
