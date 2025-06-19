import React from "react";
import styles from "./EmailSendModal.module.scss";

function EmailSendModal() {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.spinner} />
        <div className={styles.content}>인증번호 전송중</div>
      </div>
    </div>
  );
}

export default EmailSendModal;
