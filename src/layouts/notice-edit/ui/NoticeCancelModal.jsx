import React from "react";
import styles from "./NoticeCancelModal.module.scss";
import Modal from "shared/modal";
import { useNavigate } from "react-router-dom";

function NoticeCancelModal({ isOpen, onClose, noticeId }) {
  const navigate = useNavigate();

  const handleCancelNotice = () => {
    navigate(`/notice/${noticeId}`);
    window.scrollTo(0, 0);
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleCancelNotice}>
      <div className={styles.content}>
        <div className={styles.title}>글 수정을 취소하시겠습니까?</div>
        <div className={styles.info}>작성한 내용은 저장되지 않습니다.</div>
      </div>
    </Modal>
  );
}

export default NoticeCancelModal;
