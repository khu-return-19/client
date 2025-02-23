import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./AnalysisTable.module.scss";

function SkeletonAnalysisTable() {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.analysisTable}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>설명</th>
            <th>생성 일자</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr key={index}>
              <td>
                <Skeleton width={20} />
              </td>
              <td>
                <Skeleton width={150} />
              </td>
              <td>
                <Skeleton width={250} />
              </td>
              <td>
                <Skeleton width={120} />
              </td>
              <td>
                <Skeleton width={20} height={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SkeletonAnalysisTable;
