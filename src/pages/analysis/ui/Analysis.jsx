import React, { useState, useEffect } from "react";
import styles from "./Analysis.module.scss";
import { useNavigate } from "react-router-dom";
import api from "api/axiosInstance";

function Analysis() {
  const navigate = useNavigate();
  const [analyses, setAnalyses] = useState([]);
  const [selectedAnalysis, setSelectedAnalysis] = useState(new Set());
  const isAnyChecked = selectedAnalysis.size > 0;

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    try {
      const response = await api.get("/analyses");
      setAnalyses(response.data);
    } catch (error) {
      console.error("분석 보고서를 불러오는 중 오류 발생:", error);
    }
  };

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
