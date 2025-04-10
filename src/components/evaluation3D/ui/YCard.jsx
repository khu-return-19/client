import React from "react";
import styles from "./YCard.module.scss";

function YCard() {
  return (
    <div className={styles.yCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>Y축</span>
        <span className={styles.title}>직무 적합성</span>
      </div>
      <div className={styles.content}>
        <span className={styles.highlight}>직무의 요구 역량과 개인의 역량 간 매칭도 측정 </span>
        <br />
        예) 데이터 사이언티스트로서 통계 역량, 프로그래밍 능력, <br />
        도메인 이해도, 팀 협업 성향 등
      </div>
    </div>
  );
}

export default YCard;
