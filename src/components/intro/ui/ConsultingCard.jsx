import React from "react";
import styles from "./ConsultingCard.module.scss";

function ConsultingCard() {
  return (
    <div className={styles.consultingCard}>
      <span className={styles.title}>취업 준비생 컨설팅</span>
      <span className={styles.content}>
        지원자가 자기소개서와 포트폴리오를 업로드하면, <br /> AI챗봇이 현재 역량(X, Y, Z)을 점수화하고 부족한 부분별
        활동 계획을 안내해 합격률을 높임
      </span>
    </div>
  );
}

export default ConsultingCard;
