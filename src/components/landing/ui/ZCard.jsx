import React from "react";
import styles from "./ZCard.module.scss";

function ZCard() {
  return (
    <div className={styles.zCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>Z축</span>
        <span className={styles.title}>수행 역량</span>
      </div>
      <span className={styles.content}>
        프로젝트 경험, 문제 해결 사례, 팀 내 협업 등 <br />
        실제 직무 배치 시 적절한 수행 역량을 지니고 있는지 평가
      </span>
    </div>
  );
}

export default ZCard;
