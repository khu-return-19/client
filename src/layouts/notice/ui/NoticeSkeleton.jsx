import React from "react";
import styles from "./NoticeSkeleton.module.scss";
import GoToMainButton from "components/shared/goToMainButton";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function NoticeSkeleton() {
  return (
    <div className={styles.notice}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>공지사항</span>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <table className={styles.analysisTable}>
              <tbody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className={styles.clickableRow}>
                    <td>
                      <Skeleton width={200} height={20} />
                    </td>
                    <td className={styles.modifiedAt}>
                      <Skeleton width={100} height={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 UI */}
          <div className={styles.page}>
            <Skeleton width="308px" height="24px" />
          </div>
        </div>
      </div>
      <GoToMainButton />
    </div>
  );
}

export default NoticeSkeleton;
