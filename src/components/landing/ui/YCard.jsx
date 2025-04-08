import React from "react";
import styles from "./YCard.module.scss";

function YCard() {
  return (
    <div className={styles.yCard}>
      <div className={styles.titleSection}>
        <span className={styles.axis}>Y축</span>
        <span className={styles.title}>직무 적합성</span>
      </div>
      <div className={styles.content}>직무화 관련된 경험, 리더십 및 성과를 확인</div>
    </div>
  );
}

export default YCard;
