import React, { useEffect } from "react";
import styles from "./Analysis.module.scss";
import { AnalysisDetail, AnalysisSidebar } from "layouts/analysis";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchAnalyses } from "api/analysisApi";

function Analysis() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useFetchAnalyses();

  useEffect(() => {
    if (!id && data?.pages) {
      const firstAnalysis = data.pages.flat()[0];
      if (firstAnalysis?.id) {
        navigate(`/analysis/${firstAnalysis.id}`, { replace: true });
      }
    }
  }, [id, data, navigate]);

  return (
    <div className={styles.analysis}>
      <AnalysisSidebar />
      <AnalysisDetail />
    </div>
  );
}

export default Analysis;
