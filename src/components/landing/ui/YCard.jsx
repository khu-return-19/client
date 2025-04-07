import React from "react";
import styles from "./YCard.module.scss";

function YCard() {
  return (
    <div className={styles.yCard}>
      <div className={styles.title}>
        <div>Y축</div>
        <div>직무 적합성</div>
      </div>
      <div className={styles.content}>직무화 관련된 경험, 리더십 및 성과를 확인</div>
    </div>
  );
}

export default YCard;
