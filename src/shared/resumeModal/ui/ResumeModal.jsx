import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styles from "./ResumeModal.module.scss";
import { useAuth } from "auth/authContext";

function ResumeModal({ isOpen, onClose, onSubmit, resumeData }) {
  const { userInfo } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: resumeData?.title || "",
      description: resumeData?.description || "",
      content: resumeData?.content || "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: resumeData?.title || "",
        description: resumeData?.description || "",
        content: resumeData?.content || "",
      });
    }
  }, [isOpen]);

  const title = watch("title", "");
  const description = watch("description", "");
  const content = watch("content", "");

  const MAX_TITLE_LENGTH = 30;
  const MAX_DESCRIPTION_LENGTH = 50;
  const MAX_CONTENT_LENGTH = 5000;

  const onValidSubmit = (data) => {
    onSubmit(data);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <span className={styles.header}>{userInfo.name}님의 자기소개서</span>
        <form onSubmit={handleSubmit(onValidSubmit)} className={styles.content}>
          {/* 제목 입력 */}
          <div>
            <div>자기소개서 제목</div>
            <input
              type="text"
              placeholder="제목"
              {...register("title", {
                required: "제목을 입력해주세요.",
              })}
              maxLength={MAX_TITLE_LENGTH}
              className={`${styles.titleInput} ${errors.title ? styles.inputError : ""}`}
            />
            <div className={`${styles.titleBottom} ${errors.title ? styles.withError : styles.noError}`}>
              {errors.title && <div className={styles.validationError}>{errors.title.message}</div>}
              <div className={styles.charCount}>
                {title.length} / {MAX_TITLE_LENGTH}
              </div>
            </div>
          </div>

          {/* 설명 입력 */}
          <div>
            <div>자기소개서 설명</div>
            <input
              type="text"
              placeholder="설명"
              {...register("description")}
              maxLength={MAX_DESCRIPTION_LENGTH}
              className={styles.descriptionInput}
            />
            <div className={styles.charCount}>
              {description.length} / {MAX_DESCRIPTION_LENGTH}
            </div>
          </div>

          {/* 내용 입력 */}
          <div className={styles.detailArea}>
            <textarea
              placeholder="내용을 입력하세요."
              {...register("content")}
              maxLength={MAX_CONTENT_LENGTH}
              className={styles.detail}
            />
            <div className={styles.charCount}>
              {content.length} / {MAX_CONTENT_LENGTH}
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.save}>
              저장
            </button>
            <div onClick={onClose} className={styles.cancel}>
              취소
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResumeModal;
