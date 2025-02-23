import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./MyInfo.module.scss";

function SkeletonMyInfo() {
  return (
    <div className={styles.myInfo}>
      <div className={styles.row}>
        <span className={styles.label}>이름 :</span>
        <Skeleton width={100} />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>학과 :</span>
        <Skeleton width={150} />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>이메일 :</span>
        <Skeleton width={200} />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>오늘 남은 이용 횟수 :</span>
        <Skeleton width={50} />
      </div>
    </div>
  );
}

export default SkeletonMyInfo;
