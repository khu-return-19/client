import React, { useState } from "react";
import styles from "./ResumeTable.module.scss";
import { useFetchResumes } from "api/resumeApi";
import AnalysisModal from "./AnalysisModal";
import SkeletonResumeTable from "./SkeletonResumeTable";

function ResumeTable() {
  const { data: resumes = [], isLoading, isError } = useFetchResumes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState(null);

  const handleRowClick = (resumeId) => {
    setSelectedResumeId(resumeId);
    setIsModalOpen(true);
  };

  if (isLoading) return <SkeletonResumeTable />;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className={styles.tableContainer}>
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
      {isModalOpen && <AnalysisModal onClose={() => setIsModalOpen(false)} resumeId={selectedResumeId} />}
    </div>
  );
}

export default ResumeTable;
