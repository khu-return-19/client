import React, { useState, useEffect } from "react";
import styles from "./EditNotice.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchNotice, useUpdateNotice } from "api/noticeApi";
import { NoticeCancelModal, EditNoticeSkeleton } from "layouts/notice-edit";
import { toast } from "react-toastify";

function EditNotice() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 기존 공지사항 데이터 불러오기
  const { data: notice, isLoading } = useFetchNotice(id);
  const { mutate: updateNotice, isLoading: isUpdating } = useUpdateNotice();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 기존 데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (notice) {
      setTitle(notice.title);
      setContent(notice.content);
    }
  }, [notice]);

  const handleUpdateClick = () => {
    if (!title.trim() || !content.trim()) {
      toast.info("제목과 내용을 입력해주세요.");
      return;
    }

    updateNotice(
      { id, title, content },
      {
        onSuccess: () => {
          toast.success("공지사항이 수정되었습니다.");
          navigate(`/notice/${id}`);
        },
        onError: (error) => {
          console.error("공지 수정 실패:", error);
          toast.error("공지 수정에 실패했습니다.");
        },
      }
    );
  };

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  if (isLoading) return <EditNoticeSkeleton />;

  return (
    <div className={styles.editNotice}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.title}>공지사항 수정</div>
          <div className={styles.body}>
            <div className={styles.titleArea}>
              <div className={styles.label}>제목</div>
              <input
                className={styles.titleInput}
                placeholder="제목을 입력해주세요."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={styles.contentArea}>
              <div className={styles.label}>내용</div>
              <textarea
                className={styles.contentInput}
                placeholder="내용을 입력해주세요."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <div className={styles.uploadButton} onClick={handleUpdateClick}>
            {isUpdating ? "수정 중..." : "수정 완료"}
          </div>
          <div className={styles.cancelButton} onClick={handleCancelClick}>
            취소
          </div>
        </div>
      </div>
      <NoticeCancelModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} noticeId={id} />
    </div>
  );
}

export default EditNotice;
