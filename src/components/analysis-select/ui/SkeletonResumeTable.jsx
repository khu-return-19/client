import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ResumeTable.module.scss";

function SkeletonResumeTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.resumeTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>설명</th>
            <th>최근 수정 일자</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index} className={styles.clickableRow}>
              <td>
                <Skeleton width={30} />
              </td>
              <td>
                <Skeleton width={160} />
              </td>
              <td>
                <Skeleton width={200} />
              </td>
              <td>
                <Skeleton width={120} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonResumeTable;
