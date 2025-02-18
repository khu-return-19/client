import React from "react";
import styles from "./LoginError.module.scss";

function LoginError() {
  return (
    <div className={styles.loginError}>
      <div className={styles.container}>
        <span>로그인 필요</span>
        <span>이 페이지에 접근하려면 로그인해야 합니다.</span>
      </div>
    </div>
  );
}

export default LoginError;
