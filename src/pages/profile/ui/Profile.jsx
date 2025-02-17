import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import ResumeModal from "shared/resumeModal";
import { ResumeDeleteModal, ResumeDeleteCompleteModal } from "components/profile";
import { useAuth } from "auth/authContext";
import api from "api/axiosInstance";

function Profile() {
  const navigate = useNavigate();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isResumeDeleteModalOpen, setIsResumeDeleteModalOpen] = useState(false);
  const [isResumeDeleteCompleteModalOpen, setIsResumeDeleteCompleteModalOpen] = useState(false);
  const [selectedResumeTitle, setSelectedResumeTitle] = useState("");
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");

  const { userInfo } = useAuth();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const response = await api.get("/resumes");
      setResumes(response.data);
    } catch (error) {
      console.error("자기소개서 목록을 불러오는 중 오류 발생:", error);
    }
  };

  const handleCreateResume = async (data) => {
    try {
      await api.post("/resume", data);
      setIsResumeModalOpen(false);
      fetchResumes();
    } catch (error) {
      console.error("자기소개서 저장 중 오류 발생:", error);
    }
  };

  const handleRowClick = (resumeId) => {
    navigate(`/profile/${resumeId}`);
  };

  const openCreateModal = () => {
    setIsResumeModalOpen(true);
  };

  const openDeleteModal = (title, resumeId) => {
    setSelectedResumeTitle(title);
    setSelectedResumeId(resumeId);
    setIsResumeDeleteModalOpen(true);
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      await api.delete(`/resume/${resumeId}`);
      fetchResumes();
      setIsResumeDeleteModalOpen(false);
      setIsResumeDeleteCompleteModalOpen(true);
    } catch (error) {
      console.error("자기소개서 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className={styles.profile}>
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
        <div className={styles.resumesSection}>
          <div className={styles.subtitle}>나의 자기소개서</div>
          <div className={styles.tableContainer}>
            <table className={styles.resumeTable}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>설명</th>
                  <th>최근 수정 일자</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {resumes.map((resume, index) => (
                  <tr key={resume.id} onClick={() => handleRowClick(resume.id)} className={styles.clickableRow}>
                    <td>{index + 1}</td>
                    <td>{resume.title}</td>
                    <td>{resume.description}</td>
                    <td>{resume.modifiedAt}</td>
                    <td>
                      <div
                        className={styles.delete}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(resume.title, resume.id);
                        }}
                      >
                        삭제
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.buttonGroup}>
            <div className={styles.create} onClick={openCreateModal}>
              새 자기소개서 작성
            </div>
          </div>
        </div>
      </div>
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
        onSubmit={handleCreateResume}
      />
      {isResumeDeleteModalOpen && (
        <ResumeDeleteModal
          onClose={() => setIsResumeDeleteModalOpen(false)}
          title={selectedResumeTitle}
          onDeleteConfirm={handleDeleteResume(selectedResumeId)}
        />
      )}
      {isResumeDeleteCompleteModalOpen && (
        <ResumeDeleteCompleteModal
          onClose={() => setIsResumeDeleteCompleteModalOpen(false)}
          title={selectedResumeTitle}
        />
      )}
    </div>
  );
}

export default Profile;
