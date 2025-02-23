import React from "react";
import styles from "./ResumeTable.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchResumes } from "api/resumeApi";
import SkeletonResumeTable from "./SkeletonResumeTable";

function ResumeTable({ openDeleteModal }) {
  const navigate = useNavigate();

  const { data: resumes = [], isLoading, isError } = useFetchResumes();

  const handleRowClick = (resumeId) => {
    navigate(`/profile/${resumeId}`);
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
  );
}

export default ResumeTable;
