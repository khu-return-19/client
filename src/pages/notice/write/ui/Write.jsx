import React from "react";
import styles from "./Write.module.scss";
import { useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();

  const handleCancelClick = () => {
    navigate("/notice");
  };

  return (
    <div className={styles.write}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.title}>공지사항 작성</div>
          <div className={styles.body}>
            <div className={styles.titleArea}>
              <div className={styles.label}>제목</div>
              <input className={styles.titleInput} placeholder="제목을 입력해주세요."></input>
            </div>
            <div className={styles.contentArea}>
              <div className={styles.label}>내용</div>
              <textarea className={styles.contentInput} placeholder="내용을 입력해주세요."></textarea>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.uploadButton}>공지 올리기</div>
          <div className={styles.cancelButton} onClick={handleCancelClick}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
