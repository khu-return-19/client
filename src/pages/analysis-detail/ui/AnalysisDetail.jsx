import React, { useEffect, useState } from "react";
import styles from "./AnalysisDetail.module.scss";
import ReactMarkdown from "react-markdown";
import api from "api/axiosInstance";
import { useParams } from "react-router-dom";

function AnalysisDetail() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, [id]);

  const fetchAnalysis = async () => {
    try {
      const response = await api.get(`/analysis/${id}`);
      setAnalysis(response.data);
    } catch (error) {
      console.error("분석 보고서를 불러오는 중 오류 발생:", error);
    }
  };
  return (
    <div className={styles.analysisDetail}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{analysis?.title}</div>
          <div className={styles.description}>{analysis?.description}</div>
          <div className={styles.body}>
            <ReactMarkdown>{analysis?.content}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetail;
