import React from "react";
import styles from "./MyInfo.module.scss";
import { useAuth } from "auth/authContext";

function MyInfo() {
  const { userInfo } = useAuth();

  return (
    <div className={styles.myInfo}>
      <div className={styles.row}>
        <span className={styles.label}>이름 :</span>
        <span>{userInfo.name}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>학과 :</span>
        <span>{userInfo.major}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>이메일 :</span>
        <span>{userInfo.email}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.label}>오늘 남은 이용 횟수 :</span>
        <span>{userInfo.count}</span>
      </div>
    </div>
  );
}

export default MyInfo;
