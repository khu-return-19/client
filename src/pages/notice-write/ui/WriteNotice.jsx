import React, { useState } from "react";
import styles from "./WriteNotice.module.scss";
import { useNavigate } from "react-router-dom";
import { useCreateNotice } from "api/noticeApi";

function WriteNotice() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate: createNotice, isLoading } = useCreateNotice();

  const handleUploadClick = () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    createNotice(
      { title, content },
      {
        onSuccess: () => {
          alert("공지사항이 등록되었습니다.");
          navigate("/notice");
        },
        onError: (error) => {
          console.error("공지 등록 실패:", error);
          alert("공지 등록에 실패했습니다.");
        },
      }
    );
  };

  const handleCancelClick = () => {
    navigate("/notice");
  };

  return (
    <div className={styles.writeNotice}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.title}>공지사항 작성</div>
          <div className={styles.body}>
            <div className={styles.titleArea}>
              <div className={styles.label}>제목</div>
              <input
                className={styles.titleInput}
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
            </div>
            <div className={styles.contentArea}>
              <div className={styles.label}>내용</div>
              <textarea
                className={styles.contentInput}
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.uploadButton} onClick={handleUploadClick}>
            {isLoading ? "업로드 중..." : "공지 올리기"}
          </div>{" "}
          <div className={styles.cancelButton} onClick={handleCancelClick}>
            취소
          </div>
        </div>
      </div>
    </div>
  );
}

export default WriteNotice;
