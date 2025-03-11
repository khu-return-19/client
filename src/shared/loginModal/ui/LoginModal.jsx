import React from "react";
import styles from "./LoginModal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "auth/authContext";

function LoginModal({ onClose }) {
  const { login } = useAuth();

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <AiOutlineClose className={styles.closeButton} onClick={onClose} />
        </div>
        <div className={styles.body}>
          <div>
            <div>3D 역량분석 로그인</div>
            <div>khu.ac.kr로 끝나는 이메일로 로그인해주세요.</div>
          </div>
          <div className={styles.loginContainer}>
            <div
              className={styles.login}
              onClick={() => {
                login();
              }}
            >
              <img className={styles.googleLogo} src="/googleLogo.png" alt="로고" />
              <div>Google 계정으로 로그인</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
