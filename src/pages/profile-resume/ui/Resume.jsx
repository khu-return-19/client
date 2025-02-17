import React, { useState, useEffect } from "react";
import styles from "./Resume.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import ResumeModal from "shared/resumeModal";
import { useAuth } from "auth/authContext";
import api from "api/axiosInstance";

function Resume() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resume, setResume] = useState();
  const { id } = useParams();
  const { userInfo } = useAuth();

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      const response = await api.get(`/resume/${id}`);
      setResume(response.data);
    } catch (error) {
      console.error("자기소개서를 불러오는 중 오류 발생:", error);
    }
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateResume = async (data) => {
    try {
      const response = await api.patch(`/resume/${id}`, data);
      setResume(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("자기소개서를 수정하는 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.resume}>
      <div className={styles.container}>
        <div className={styles.title}>내 정보</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.info}>
          <div>이름 : {userInfo.name}</div>
          <div>|</div>
          <div>학과 : {userInfo.major}</div>
          <div>|</div>
          <div>이메일 : {userInfo.email}</div>
          <div>|</div>
          <div>오늘 남은 이용 횟수 : {userInfo.count}</div>
        </div>
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
