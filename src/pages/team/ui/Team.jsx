import React from "react";
import styles from "./Team.module.scss";

function Team() {
  return (
    <div className={styles.team}>
      <div className={styles.title}>서비스 구성원 소개</div>
      <div className={styles.members}>
        <div className={styles.member}>교수님</div>
        <div className={styles.member}>홍길동</div>
        <div className={styles.member}>홍길동</div>
        <div className={styles.member}>홍길동</div>
        <div className={styles.member}>홍길동</div>
      </div>
    </div>
  );
}

export default Team;
