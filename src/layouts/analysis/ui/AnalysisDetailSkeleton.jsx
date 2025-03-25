import React from "react";
import styles from "./AnalysisDetailSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnalysisDetailSkeleton() {
  return (
    <div className={styles.analysisDetailSkeleton}>
      <div className={styles.wrapper}>
        <span className={styles.title}>내 분석 레포트</span>
        <div className={styles.skeleton}>
          <div>
            <Skeleton height={30} />
            <Skeleton height={100} />
          </div>
          <div>
            <Skeleton height={30} />
            <Skeleton height={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetailSkeleton;
