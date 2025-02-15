import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import ResumeModal from "shared/resumeModal";
import { ResumeDeleteModal, ResumeDeleteCompleteModal } from "components/profile";

const mockUserInfo = {
  name: "홍길동",
  department: "소프트웨어융합대학 컴퓨터공학과",
  email: "example.khu.ac.kr",
  count: "1 / 3",
};

const mockResumes = [
  { id: 1, title: "첫 번째 자기소개서", description: "프론트엔드 개발 직군 지원용", lastModified: "2025-02-12 08:42" },
  { id: 2, title: "두 번째 자기소개서", description: "백엔드 개발 직군 지원용", lastModified: "2025-02-10 14:11" },
];

function Profile() {
  const navigate = useNavigate();
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isResumeDeleteModalOpen, setIsResumeDeleteModalOpen] = useState(false);
  const [isResumeDeleteCompleteModalOpen, setIsResumeDeleteCompleteModalOpen] = useState(false);
  const [selectedResumeTitle, setSelectedResumeTitle] = useState("");

  const handleRowClick = (resumeId) => {
    navigate(`/profile/${resumeId}`);
  };

  const openCreateModal = () => {
    setIsResumeModalOpen(true);
  };

  const openDeleteModal = (title) => {
    console.log(title);
    setSelectedResumeTitle(title);
    setIsResumeDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    setIsResumeDeleteModalOpen(false);
    setIsResumeDeleteCompleteModalOpen(true);
  };

  return (
    <div className={styles.profile}>
      <div className={styles.container}>
        <div className={styles.title}>내 정보</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.info}>
          <div>이름 : {mockUserInfo.name}</div>
          <div>|</div>
          <div>학과 : {mockUserInfo.department}</div>
          <div>|</div>
          <div>이메일 : {mockUserInfo.email}</div>
          <div>|</div>
          <div>오늘 남은 이용 횟수 : {mockUserInfo.count}</div>
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
                {mockResumes.map((resume, index) => (
                  <tr key={resume.id} onClick={() => handleRowClick(resume.id)} className={styles.clickableRow}>
                    <td>{index + 1}</td>
                    <td>{resume.title}</td>
                    <td>{resume.description}</td>
                    <td>{resume.lastModified}</td>
                    <td>
                      <div
                        className={styles.delete}
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(resume.title);
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
        onSubmit={(data) => console.log("새 자기소개서 생성:", data)}
        mode="create"
      />
      {isResumeDeleteModalOpen && (
        <ResumeDeleteModal
          onClose={() => setIsResumeDeleteModalOpen(false)}
          title={selectedResumeTitle}
          onDeleteConfirm={handleDeleteConfirm}
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
