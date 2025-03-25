import React from "react";
import styles from "./NoticeDetailSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NoticeDetailSkeleton() {
  return (
    <div className={styles.noticeDetail}>
      <div className={styles.wrapper}>
        <div className={styles.notice}>공지사항</div>
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.title}>
              <Skeleton width={250} height={30} />
            </div>
            <Skeleton width={100} height={20} />
          </div>
          <div className={styles.body}>
            <Skeleton count={5} height="24px" style={{ marginBottom: "10px" }} />
          </div>
        </div>
      </div>
      <div className={styles.listButton}>목록으로</div>
    </div>
  );
}

export default NoticeDetailSkeleton;
