import React from "react";
import styles from "./CompetencyManagementCard.module.scss";

function CompetencyManagementCard() {
  return (
    <div className={styles.competencyManagementCard}>
      <span className={styles.title}>조직 내 역량 관리</span>
      <span className={styles.content}>
        재직자들의 역량을 주기적으로 평가·분석하여, <br />
        인재 배치 최적화와 프로젝트 성과 향상을 유도
      </span>
    </div>
  );
}

export default CompetencyManagementCard;
