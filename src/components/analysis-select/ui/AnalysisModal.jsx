import React, { useState } from "react";
import styles from "./AnalysisModal.module.scss";

function AnalysisModal({ onClose, onSubmit, resumeData }) {
  const [title, setTitle] = useState(resumeData?.title || "");
  const [description, setDescription] = useState(resumeData?.description || "");
  const [content, setContent] = useState(resumeData?.content || "");

  const handleSubmit = () => {
    onSubmit({ resumeData });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>홍길동님의 자기소개서</div>
        <div className={styles.content}>
          <div>자기소개서 제목</div>
          <div>자기소개서 설명</div>
          <div className={styles.body}>내용~~~</div>
          <div className={styles.buttonGroup}>
            <div className={styles.confirm}>확인</div>
            <div onClick={onClose} className={styles.cancel}>
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisModal;
