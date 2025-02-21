import React, { useState, useEffect } from "react";
import styles from "./ResumeSelect.module.scss";
import { useNavigate } from "react-router-dom";
import api from "api/axiosInstance";
import Resume from "pages/profile-resume";
import { AnalysisModal } from "components/analysis-select";
import { useFetchResumes } from "api/resumeApi";

function ResumeSelect() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const { data: resumes = [], isLoading, isError } = useFetchResumes();

  const handleRowClick = (resumeId) => {
    setSelectedResumeId(resumeId);
    setIsModalOpen(true);
  };

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className={styles.resumeSelect}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.info}>
          <div>아이콘</div>
          <div>
            <div>[이용 방법 안내]</div>
            <div>
              분석하고자 하는 <strong>나의 자기소개서</strong> 목록에서 클릭합니다.
            </div>
            <br />
            <div>[이용시 주의 사항]</div>
            <div>
              1. 하루 3회만 분석이 가능합니다. <strong>매일 자정 이용가능 횟수가 초기화</strong>됩니다. (자기소개서를
              충분히 검토한 후에 사용하시길 바랍니다.) <br />
              2. 합격확률 및 3D 점수와 같은 수치는 예년 합격자들과의 상대적인 차이로 산출된 점수입니다. (시간에 따라
              수치가 다르게 나타날 수 있습니다.) <br />
              3. AI는 실수할 수 있습니다. <br />
              4. 기타 발생한 버그는 example@khu.ac.kr로 제보 부탁드립니다.
            </div>
          </div>
        </div>
        <div className={styles.resumeSection}>
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
              {resumes.map((resume, index) => (
                <tr key={resume.id} className={styles.clickableRow} onClick={() => handleRowClick(resume.id)}>
                  <td>{index + 1}</td>
                  <td>{resume.title}</td>
                  <td>{resume.description}</td>
                  <td>{resume.modifiedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && (
        <AnalysisModal onClose={() => setIsModalOpen(false)} onSubmit={(resumeId) => {}} resumeId={selectedResumeId} />
      )}
    </div>
  );
}

export default ResumeSelect;
