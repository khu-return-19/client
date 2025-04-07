import React from "react";
import styles from "./ZCard.module.scss";

function ZCard() {
  return (
    <div className={styles.zCard}>
      <div className={styles.title}>
        <div>Z축</div>
        <div>수행 역량</div>
      </div>
      <div className={styles.content}>
        프로젝트 경험, 문제 해결 사례, 팀 내 협업 등 <br />
        실제 직무 배치 시 적절한 수행 역량을 지니고 있는지 평가
      </div>
    </div>
  );
}

export default ZCard;
