import React from "react";
import styles from "./ResumeDeleteCompleteModal.module.scss";

function ResumeDeleteCompleteModal({ onClose, title }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>삭제 확인</div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div>'{title}'</div>
            <div className={styles.text}>자기소개서가 삭제되었습니다.</div>
          </div>
          <div className={styles.footer}>
            <div className={styles.confirmlButton} onClick={onClose}>
              확인
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDeleteCompleteModal;
