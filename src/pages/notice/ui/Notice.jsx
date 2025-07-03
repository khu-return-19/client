import React, { useState, useMemo } from "react";
import styles from "./Notice.module.scss";
import GoToMainButton from "components/shared/goToMainButton";
import { useNavigate } from "react-router-dom";
import { useFetchNotices } from "api/noticeApi";
import { NoticeSkeleton } from "layouts/notice";

function Notice() {
  const itemsPerPage = 8;
  const [pageGroup, setPageGroup] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useFetchNotices(currentPage, itemsPerPage);

  const totalPages = data?.page || 1;

  const navigate = useNavigate();

  const handleRowClick = (noticeId) => {
    navigate(`/notice/${noticeId}`);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const prevGroupPage = (pageGroup - 1) * 5 + 5;
      setPageGroup((prev) => prev - 1);
      setCurrentPage(prevGroupPage);
    }
  };

  const handleNextGroup = () => {
    if (pageGroup < Math.floor(totalPages / 5)) {
      const nextGroupPage = (pageGroup + 1) * 5 + 1;
      setPageGroup((prev) => prev + 1);
      setCurrentPage(nextGroupPage);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const visiblePageNumbers = useMemo(() => {
    const start = pageGroup * 5 + 1;
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pageGroup, totalPages]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    // UTC 시간에서 한국 시간(KST)으로 변환 (9시간 추가)
    const koreaTime = new Date(date.getTime() + 9 * 60 * 60 * 1000);

    // 날짜 형식 지정 (YYYY.MM.DD)
    return koreaTime
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(/\.$/, "");
  };

  if (isLoading) {
    return <NoticeSkeleton />;
  }

  return (
    <div className={styles.notice}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <span className={styles.title}>공지사항</span>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.table}>
            {data.notices?.length === 0 ? (
              <div className={styles.noNotices}>공지사항이 아직 존재하지 않습니다.</div>
            ) : (
              <table className={styles.analysisTable}>
                <tbody>
                  {data.notices?.map((notice, index) => (
                    <tr key={notice.id} className={styles.clickableRow} onClick={() => handleRowClick(notice.id)}>
                      <td>{notice.title}</td>
                      <td className={styles.modifiedAt}>
                        <div>{formatDate(notice.modifiedAt)}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* 페이지네이션 UI */}
          {totalPages >= 1 && (
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
      <GoToMainButton />
    </div>
  );
}

export default Notice;
