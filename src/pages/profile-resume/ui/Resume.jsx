import React, { useState } from "react";
import styles from "./Resume.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ResumeModal from "shared/resumeModal";
import { MyInfo } from "components/shared";
import { useFetchResume, useUpdateResume } from "api/resumeApi";
import { toast } from "react-toastify";

function Resume() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();

  const { data: resume, isLoading, isError, refetch } = useFetchResume(id);
  const { mutate: updateResume } = useUpdateResume(id);

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateResume = (data) => {
    updateResume(data, {
      onSuccess: () => {
        refetch(); // 자기소개서 업데이트 후 새로고침
        setIsModalOpen(false);
        toast.success("자기소개서가 수정되었습니다!");
      },
      onError: (error) => {
        console.error("자기소개서를 수정하는 중 오류 발생:", error);
        toast.error("자기소개서 수정 중 오류가 발생했습니다.");
      },
    });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>자기소개서를 불러오는 데 오류가 발생했습니다.</div>;

  return (
    <div className={styles.resume}>
      <div className={styles.container}>
        <div className={styles.title}>내 정보</div>
        <div className={styles.horizontalLine}></div>
        <MyInfo />
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.contentTitle}>{resume?.title}</div>
              <div className={styles.contentDescription}>{resume?.description}</div>
            </div>
            <div className={styles.buttonGroup}>
              <div className={styles.list} onClick={handleNavigateToProfile}>
                목록으로
              </div>
              <div className={styles.edit} onClick={openEditModal}>
                자기소개서 수정
              </div>
            </div>
          </div>
          <div className={styles.body}>{resume?.content}</div>
        </div>
      </div>
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdateResume}
        resumeData={resume}
      />
    </div>
  );
}

export default Resume;
