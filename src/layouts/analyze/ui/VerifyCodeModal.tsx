import React from "react";
import styles from "./VerifyCodeModal.module.scss";

function VerifyCodeModal() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner} />
        <div className={styles.content}>인증번호 확인중</div>
      </div>
    </div>
  );
}

export default VerifyCodeModal;
