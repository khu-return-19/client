import React, { useState } from "react";
import styles from "./Profile.module.scss";
import { useNavigate } from "react-router-dom";
import ResumeModal from "shared/resumeModal/ui/ResumeModal.jsx";

const mockUserInfo = {
  name: "홍길동",
  department: "소프트웨어융합대학 컴퓨터공학과",
  email: "example.khu.ac.kr",
  count: "1 / 3",
};

const mockResumes = [
  { id: 1, title: "첫 번째 자기소개서", description: "프론트엔드 개발 직군 지원용", lastModified: "2025-02-12" },
  { id: 2, title: "두 번째 자기소개서", description: "백엔드 개발 직군 지원용", lastModified: "2025-02-10" },
];

function Profile() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowClick = (resumeId) => {
    navigate(`/profile/${resumeId}`);
  };

  const openCreateModal = () => {
    setIsModalOpen(true);
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
          <table className={styles.resumeTable}>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>설명</th>
                <th>최근 수정 일자</th>
              </tr>
            </thead>
            <tbody>
              {mockResumes.map((resume, index) => (
                <tr key={resume.id} onClick={() => handleRowClick(resume.id)} className={styles.clickableRow}>
                  <td>{index + 1}</td>
                  <td>{resume.title}</td>
                  <td>{resume.description}</td>
                  <td>{resume.lastModified}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.buttonGroup}>
            <div className={styles.delete}>자기소개서 삭제</div>
            <div className={styles.create} onClick={openCreateModal}>
              새 자기소개서 작성
            </div>
          </div>
        </div>
      </div>
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => console.log("새 자기소개서 생성:", data)}
        mode="create"
      />
    </div>
  );
}

export default Profile;
