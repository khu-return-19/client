import React from "react";
import styles from "./AnalysisDetail.module.scss";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useFetchAnalysis } from "api/analysisApi";
import { SkeletonAnalysisDetail } from "components/analysis-detail";

function AnalysisDetail() {
  const { id } = useParams();

  const { data: analysis, isLoading, isError } = useFetchAnalysis(id);

  if (isLoading) return <SkeletonAnalysisDetail />;
  if (isError) return <div>분석 보고서를 불러오는 데 오류가 발생했습니다.</div>;

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
