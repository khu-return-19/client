import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonAnalysisDetail.module.scss";

function SkeletonAnalysisDetail() {
  return (
    <div className={styles.analysisDetail}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>
            <Skeleton width={300} />
          </div>
          <div className={styles.description}>
            <Skeleton width={400} />
          </div>
          <div className={styles.body}>
            <Skeleton height={500} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonAnalysisDetail;
