import React from "react";
import styles from "./DeleteNoticeModal.module.scss";
import Modal from "shared/modal";
import { useDeleteNotice } from "api/noticeApi";
import { useNavigate } from "react-router-dom";

function DeleteNoticeModal({ isOpen, onClose, noticeId }) {
  const { mutate: deleteNotice } = useDeleteNotice();
  const navigate = useNavigate();

  const handleDeleteNotice = () => {
    deleteNotice(noticeId, {
      onSuccess: () => {
        alert("공지사항이 삭제되었습니다.");
        onClose();
        navigate("/notice");
        window.scrollTo(0, 0);
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
        alert("삭제 중 오류가 발생했습니다.");
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} onConfirm={handleDeleteNotice}>
      <div className={styles.content}>
        <div className={styles.title}>공지사항을 삭제하겠습니까?</div>
        <div className={styles.info}>삭제 후 공지사항은 복구할 수 없습니다.</div>
      </div>
    </Modal>
  );
}

export default DeleteNoticeModal;
