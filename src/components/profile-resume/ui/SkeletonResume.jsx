import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./SkeletonResume.module.scss";
import { MyInfo } from "components/shared";

function SkeletonResume() {
  return (
    <div className={styles.resume}>
      <div className={styles.container}>
        <div className={styles.title}>내 정보</div>
        <div className={styles.horizontalLine}></div>
        <MyInfo />
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.headerContent}>
              <Skeleton width={200} height={30} />
              <Skeleton width={300} height={20} style={{ marginTop: 10 }} />
            </div>
            <div className={styles.buttonGroup}>
              <Skeleton width={80} height={30} />
              <Skeleton width={120} height={30} />
            </div>
          </div>
          <div>
            <Skeleton height={500} style={{ marginBottom: 10 }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SkeletonResume;
