import React from "react";
import styles from "./AnalysisConfirmModal.module.scss";
import Modal from "shared/modal";

function AnalysisConfirmModal({ isOpen, onClose, onConfirm, count }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={onConfirm}>
      <div className={styles.content}>
        <div className={styles.title}>분석을 시작하겠습니까?</div>
        <div className={styles.info}>분석 횟수가 1회 차감됩니다.</div>
        <div className={styles.count}>오늘 남은 이용 횟수 : {count} / 3</div>
      </div>
    </Modal>
  );
}

export default AnalysisConfirmModal;
