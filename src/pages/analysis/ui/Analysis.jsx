import React, { useState } from "react";
import styles from "./Analysis.module.scss";
import { useNavigate } from "react-router-dom";

const mockanalysis = [
  { id: 1, title: "첫 번째 자기소개서", description: "프론트엔드 개발 직군 지원용", lastModified: "2025-02-12 08:42" },
  { id: 2, title: "두 번째 자기소개서", description: "백엔드 개발 직군 지원용", lastModified: "2025-02-10 14:11" },
];

function Analysis() {
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState(new Set());
  const isAnyChecked = selectedAnalysis.size > 0;

  const handleRowClick = (analysisId) => {
    navigate(`/analysis/${analysisId}`);
  };

  const handleAnalyzeClick = () => {
    navigate("/analysis/select");
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

  return (
    <div className={styles.analysis}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.analysisSection}>
          <div className={styles.subtitle}>나의 자기소개서 분석 보고서</div>
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
              {mockanalysis.map((analysis, index) => (
                <tr key={analysis.id} className={styles.clickableRow} onClick={() => handleRowClick(analysis.id)}>
                  <td>{index + 1}</td>
                  <td>{analysis.title}</td>
                  <td>{analysis.description}</td>
                  <td>{analysis.lastModified}</td>
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
          <div className={styles.buttonGroup}>
            <div className={styles.create} onClick={handleAnalyzeClick}>
              새 자기소개서 분석
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analysis;
