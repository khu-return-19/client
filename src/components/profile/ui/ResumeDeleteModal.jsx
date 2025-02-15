import React, { useState } from "react";
import styles from "./ResumeDeleteModal.module.scss";

function ResumeDeleteModal({ onClose, onDeleteConfirm, title }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>삭제 확인</div>
        <div className={styles.body}>
          <div className={styles.content}>
            <div>'{title}'</div>
            <div className={styles.text}>자기소개서를 삭제하시겠습니까?</div>
          </div>
          <div className={styles.footer}>
            <div className={styles.deleteButton} onClick={onDeleteConfirm}>
              삭제
            </div>
            <div className={styles.cancelButton} onClick={onClose}>
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeDeleteModal;
