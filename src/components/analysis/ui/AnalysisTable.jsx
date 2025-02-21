import React, { useState } from "react";
import styles from "./AnalysisTable.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchAnalyses } from "api/analysisApi";

function AnalysisTable() {
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState(new Set());
  const isAnyChecked = selectedAnalysis.size > 0;

  const { data: analyses = [], isLoading, isError } = useFetchAnalyses();

  const handleRowClick = (analysisId) => {
    navigate(`/analysis/${analysisId}`);
  };

  const handleCheckboxChange = (analysisId) => {
    setSelectedAnalysis((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(analysisId)) {
        newSet.delete(analysisId);
      } else {
        newSet.add(analysisId);
      }
      return newSet;
    });
  };

  if (isLoading) return <p>불러오는 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className={styles.tableContainer}>
      <table className={styles.analysisTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>설명</th>
            <th>생성 일자</th>
            <th>
              <div className={`${styles.delete} ${isAnyChecked ? styles.deleteActive : ""}`}>삭제</div>
            </th>
          </tr>
        </thead>
        <tbody>
          {analyses.map((analysis, index) => (
            <tr key={analysis.id} className={styles.clickableRow} onClick={() => handleRowClick(analysis.id)}>
              <td>{index + 1}</td>
              <td>{analysis.title}</td>
              <td>{analysis.preview}</td>
              <td>{analysis.createdAt}</td>
              <td>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  onChange={() => handleCheckboxChange(analysis.id)}
                  onClick={(e) => e.stopPropagation()}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnalysisTable;
