import React, { useState, useMemo, useEffect } from "react";
import styles from "./AnalysisTable.module.scss";
import { useNavigate } from "react-router-dom";
import { useFetchAnalyses, useDeleteAnalyses } from "api/analysisApi";
import { useAuth } from "auth/authContext";
import { toast } from "react-toastify";
import SkeletonAnalysisTable from "./SkeletonAnalysisTable";

function AnalysisTable() {
  const navigate = useNavigate();
  const [selectedAnalysis, setSelectedAnalysis] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [pageGroup, setPageGroup] = useState(0);
  const isAnyChecked = selectedAnalysis.size > 0;
  const itemsPerPage = 10;
  const { userInfo } = useAuth();
  const totalAnalyses = userInfo?.analysisCount || 0;
  const totalPages = Math.ceil(totalAnalyses / itemsPerPage);

  const {
    data: analyses = [],
    isLoading,
    isError,
    refetch,
  } = useFetchAnalyses({
    page: currentPage,
  });

  const { mutate: deleteAnalyses, isLoading: isDeleting } = useDeleteAnalyses();

  // 페이지 전환 시 스크롤 위치를 유지하도록 설정
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  const handleRowClick = (analysisId) => {
    navigate(`/analysis/${analysisId}`);
  };

  const handleCheckboxChange = (analysisId) => {
    setSelectedAnalysis((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(analysisId)) {
        newSet.delete(analysisId);
      } else {
        newSet.add(analysisId);
      }
      return newSet;
    });
  };

  const handleDelete = () => {
    if (!isAnyChecked || isDeleting) return;

    const idsToDelete = Array.from(selectedAnalysis);
    deleteAnalyses(idsToDelete, {
      onSuccess: () => {
        setSelectedAnalysis(new Set());
        refetch();
        toast.success("선택한 분석 보고서를 삭제했습니다!");
      },
      onError: (error) => {
        console.error("삭제 실패:", error);
        toast.error("삭제 중 오류가 발생했습니다.");
      },
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    refetch();
  };

  const visiblePageNumbers = useMemo(() => {
    const start = pageGroup * 5 + 1;
    const end = Math.min(totalPages, start + 4);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [pageGroup, totalPages]);

  const handleNextGroup = () => {
    if (pageGroup < Math.floor(totalPages / 5)) {
      const nextGroupPage = (pageGroup + 1) * 5 + 1;
      setPageGroup((prev) => prev + 1);
      setCurrentPage(nextGroupPage);
      refetch();
    }
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const prevGroupPage = (pageGroup - 1) * 5 + 5;
      setPageGroup((prev) => prev - 1);
      setCurrentPage(prevGroupPage);
      refetch();
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageGroup(0);
    refetch();
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setPageGroup(Math.floor((totalPages - 1) / 5));
    refetch();
  };

  if (isLoading) return <SkeletonAnalysisTable />;
  if (isError) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  return (
    <div className={styles.tableContainer}>
      <div className={styles.table}>
        <table className={styles.analysisTable}>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>설명</th>
              <th>생성 일자</th>
              <th>
                <div
                  className={`${styles.delete} ${isAnyChecked ? styles.deleteActive : ""}`}
                  onClick={handleDelete}
                  disabled={!isAnyChecked || isDeleting}
                >
                  {isDeleting ? "삭제 중..." : "삭제"}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {analyses.map((analysis, index) => (
              <tr key={analysis.id} className={styles.clickableRow} onClick={() => handleRowClick(analysis.id)}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{analysis.title}</td>
                <td>{analysis.preview}</td>
                <td>{analysis.createdAt}</td>
                <td>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    onChange={() => handleCheckboxChange(analysis.id)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 UI */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button onClick={handleFirstPage} disabled={pageGroup === 0}>
            &lt;&lt;
          </button>
          <button onClick={handlePrevGroup} disabled={pageGroup === 0}>
            &lt;
          </button>

          {visiblePageNumbers.map((page) => (
            <button
              key={page}
              className={currentPage === page ? styles.activePage : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}

          <button onClick={handleNextGroup} disabled={pageGroup === Math.ceil(totalPages / 5) - 1}>
            &gt;
          </button>
          <button onClick={handleLastPage} disabled={pageGroup === Math.ceil(totalPages / 5) - 1}>
            &gt;&gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default AnalysisTable;
