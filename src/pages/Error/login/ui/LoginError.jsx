import React, { useState } from "react";
import styles from "./LoginError.module.scss";
import { LoginModal } from "shared/loginModal";

function LoginError() {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  return (
    <div className={styles.loginError}>
      <div className={styles.textArea}>
        <span className={styles.title}>로그인이 필요한 서비스입니다.</span>
        <span className={styles.info}>
          로그인 후 장시간 자리를 비우셨거나 로그인하지 않으셨습니다. <br />
          다시 로그인을 진행해주세요.
        </span>
      </div>
      <div className={styles.loginButton} onClick={() => setLoginModalOpen(true)}>
        로그인
      </div>
      {isLoginModalOpen && <LoginModal onClose={() => setLoginModalOpen(false)} />}
    </div>
  );
}

export default LoginError;
