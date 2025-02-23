import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./AnalysisModal.module.scss";

function SkeletonAnalysisModal() {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <div>
            <Skeleton width={300} />
          </div>
          <div>
            <Skeleton width={400} />
          </div>
          <div className={styles.body}>
            <Skeleton count={5} height={20} />
          </div>
          <div className={styles.noticeText}>
            <Skeleton width={300} />
          </div>
          <div className={styles.buttonGroup}>
            <Skeleton width={100} height={40} />
            <Skeleton width={100} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonAnalysisModal;
