import React from "react";
import styles from "./EditNoticeSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function EditNoticeSkeleton() {
  return (
    <div className={styles.editNotice}>
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <div className={styles.title}>공지사항 수정</div>
          <div className={styles.body}>
            <div className={styles.titleArea}>
              <div className={styles.label}>제목</div>
              <Skeleton height={56} />
            </div>
            <div className={styles.contentArea}>
              <div className={styles.label}>내용</div>
              <Skeleton height={300} />
            </div>
          </div>
        </div>
        <div className={styles.buttonGroup}>
          <Skeleton width={600} height={60} />
          <Skeleton width={600} height={60} />
        </div>
      </div>
    </div>
  );
}

export default EditNoticeSkeleton;
