import React from "react";
import styles from "./Modal.module.scss";

function Modal({ children, isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <img src="/shared/warning-icon.png" alt="" className={styles.warningIcon} />
        </div>
        <div className={styles.body}>{children}</div>
        <div className={styles.footer}>
          <div className={styles.cancelButton} onClick={onClose}>
            취소
          </div>
          <div className={styles.confirmButton} onClick={onConfirm}>
            확인
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
