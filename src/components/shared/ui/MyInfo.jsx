import React from "react";
import styles from "./MyInfo.module.scss";
import { useAuth } from "auth/authContext";

function MyInfo() {
  const { userInfo } = useAuth();

  return (
    <div className={styles.myInfo}>
      <div>이름 : {userInfo.name}</div>
      <div>|</div>
      <div>학과 : {userInfo.major}</div>
      <div>|</div>
      <div>이메일 : {userInfo.email}</div>
      <div>|</div>
      <div>오늘 남은 이용 횟수 : {userInfo.count}</div>
    </div>
  );
}

export default MyInfo;
