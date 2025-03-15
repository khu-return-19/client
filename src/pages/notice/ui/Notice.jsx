import React, { useState, useMemo, useEffect } from "react";
import styles from "./Notice.module.scss";

const allNotices = [
  { id: 1, title: "Notice 1", modifiedAt: "2025-03-14" },
  { id: 2, title: "Notice 2", modifiedAt: "2025-03-13" },
  { id: 3, title: "Notice 3", modifiedAt: "2025-03-12" },
  { id: 1, title: "Notice 1", modifiedAt: "2025-03-14" },
  { id: 2, title: "Notice 2", modifiedAt: "2025-03-13" },
  { id: 3, title: "Notice 3", modifiedAt: "2025-03-12" },
  { id: 1, title: "Notice 1", modifiedAt: "2025-03-14" },
  { id: 2, title: "Notice 2", modifiedAt: "2025-03-13" },
];

// TODO: 실제 데이터 로직 연결 필요
function Notice() {
  const itemsPerPage = 8;
  // const totalNotice =  || 0;
  const totalNotice = 100;
  const totalPages = Math.ceil(totalNotice / itemsPerPage);
  const [pageGroup, setPageGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const handleRowClick = (noticeId) => {};

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const prevGroupPage = (pageGroup - 1) * 5 + 5;
      setPageGroup((prev) => prev - 1);
      setCurrentPage(prevGroupPage);
      // refetch();
    }
  };

  const handleNextGroup = () => {
    if (pageGroup < Math.floor(totalPages / 5)) {
      const nextGroupPage = (pageGroup + 1) * 5 + 1;
      setPageGroup((prev) => prev + 1);
      setCurrentPage(nextGroupPage);
      // refetch();
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    // refetch();
  };

  const visiblePageNumbers = useMemo(() => {
    const start = pageGroup * 5 + 1;
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pageGroup, totalPages]);

  return (
    <div className={styles.notice}>
      <div className={styles.wrapper}>
        <span className={styles.title}>공지사항</span>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            <table className={styles.analysisTable}>
              <tbody>
                {allNotices.map((notice, index) => (
                  <tr key={notice.id} className={styles.clickableRow} onClick={() => handleRowClick(notice.id)}>
                    <td>{notice.title}</td>
                    <td className={styles.modifiedAt}>
                      <div>{notice.modifiedAt}</div>
                      <div> &gt;</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 페이지네이션 UI */}
          {totalPages > 1 && (
            <div className={styles.pagination}>
              <div
                onClick={handlePrevGroup}
                className={`${styles.prevButton} ${pageGroup === 0 ? styles.disabled : ""}`}
              >
                &lt;
              </div>
              <div className={styles.pageNumbers}>
                {visiblePageNumbers.map((page) => (
                  <div
                    key={page}
                    className={currentPage === page ? styles.activePage : ""}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </div>
                ))}
              </div>
              <div
                onClick={handleNextGroup}
                className={`${styles.nextButton} ${pageGroup === Math.ceil(totalPages / 5) - 1 ? styles.disabled : ""}`}
              >
                &gt;
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notice;
