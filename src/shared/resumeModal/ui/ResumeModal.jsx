import React, { useState } from "react";
import styles from "./ResumeModal.module.scss";

function ResumeModal({ isOpen, onClose, onSubmit, mode, resumeData }) {
  const [title, setTitle] = useState(resumeData?.title || "");
  const [description, setDescription] = useState(resumeData?.description || "");
  const [content, setContent] = useState(resumeData?.content || "");

  const handleSubmit = () => {
    onSubmit({ resumeData });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>홍길동님의 자기소개서</div>
        <div className={styles.content}>
          <div>
            <div>자기소개서 제목</div>
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={styles.titleInput}
            />
            <div className={styles.titleValidation}>*자기소개서 제목은 필수로 입력해야합니다.</div>
          </div>
          <div>
            <div>자기소개서 설명</div>
            <input
              type="text"
              placeholder="설명"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={styles.descriptionInput}
            />
          </div>
          <textarea
            placeholder=""
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={styles.detail}
          />
          <div className={styles.buttonGroup}>
            <div className={styles.save}>저장</div>
            <div onClick={onClose} className={styles.cancel}>
              취소
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
