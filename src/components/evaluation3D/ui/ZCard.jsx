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
        <span className={styles.highlight}>성과(KPI), 프로젝트 완성도, 문제 해결, 리더십 등을 측정</span>
        <br />
        예) 프로젝트에서 어떤 성과를 냈는지,
        <br /> 협업 환경에서 리더십과 팔로워십을 어떻게 발휘했는지
      </span>
    </div>
  );
}

export default ZCard;
