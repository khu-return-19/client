import React, { useState } from "react";
import styles from "./Resume.module.scss";
import { useNavigate } from "react-router-dom";
import ResumeModal from "shared/resumeModal";

const mockUserInfo = {
  name: "홍길동",
  department: "소프트웨어융합대학 컴퓨터공학과",
  email: "example.khu.ac.kr",
  count: "1 / 3",
};

const mockResumeData = {
  title: "프론트엔드 개발 직군 지원 자기소개서",
  description: "프론트엔드 개발자로 지원하기 위한 자기소개서입니다.",
  body: "안녕하세요! 저는 사용자 경험을 중요하게 생각하는 프론트엔드 개발자 지망생입니다. 최신 기술을 학습하고 적용하는 것을 즐기며, React와 TypeScript를 활용한 프로젝트 경험이 있습니다...",
};

function Resume() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigateToProfile = () => {
    navigate("/profile");
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.resume}>
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
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.contentTitle}>{mockResumeData.title}</div>
              <div className={styles.contentDescription}>{mockResumeData.description}</div>
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
          <div className={styles.body}>{mockResumeData.body}</div>
        </div>
      </div>
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => console.log("자기소개서 수정:", data)}
        mode="edit"
      />
    </div>
  );
}

export default Resume;
