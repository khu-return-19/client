import React, { useState, useRef, useEffect } from "react";
import styles from "./Analysis.module.scss";
import { useFetchAnalyses } from "api/analysisApi";
import { mergeNewData } from "pages/analysis/utils/mergeNewData";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { DeleteAnalysisModal } from "layouts/analysis";
import { AnalysisDetail } from "layouts/analysis";

function Analysis() {
  const [isActive, setIsActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [groupedAnalyses, setGroupedAnalyses] = useState({});
  const navigate = useNavigate();
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading: isLoadingAnalyses, fetchNextPage, hasNextPage } = useFetchAnalyses();
  const observerRef = useRef(null);

  useEffect(() => {
    if (data?.pages) {
      const newAnalyses = data.pages.at(-1);
      setGroupedAnalyses((prevGrouped) => mergeNewData(prevGrouped, newAnalyses));

      const firstAnalysis = data.pages.flat()[0];
      if (firstAnalysis?.id) {
        navigate(`/analysis/${firstAnalysis.id}`, { replace: true });
        setSelectedAnalysisId(firstAnalysis.id);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage(); // 스크롤이 끝에 도달하면 다음 페이지 요청
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const handleAnalysisSelect = (analysisId) => {
    setSelectedAnalysisId(analysisId);
    navigate(`/analysis/${analysisId}`);
  };

  const handleDeleteClick = (analysisId) => {
    setSelectedAnalysisId(analysisId);
    setIsModalOpen(true);
  };

  return (
    <div className={styles.analysis}>
      <div className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ""}`}>
        <div className={styles.iconSection}>
          <img
            src={isActive ? "/sidebarIconActive.png" : "/sidebarIcon.png"}
            alt=""
            className={styles.sidebarIcon}
            onMouseEnter={() => setIsActive(true)}
            onMouseLeave={() => setIsActive(false)}
            onClick={() => setIsCollapsed((prev) => !prev)}
          />
        </div>
        <div className={`${styles.list} ${isCollapsed ? styles.collapsed : ""}`}>
          {Object.keys(groupedAnalyses).length > 0 ? (
            Object.entries(groupedAnalyses).map(([category, analyses]) => (
              <div key={category} className={styles.category}>
                <div className={styles.categoryTitle}>{category}</div>
                {analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className={`${styles.analysisItem} ${selectedAnalysisId === analysis.id ? styles.selected : ""}`}
                    onClick={() => handleAnalysisSelect(analysis.id)}
                  >
                    <div className={styles.title}>{analysis.title}</div>
                    <div
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation(); // 삭제 버튼 클릭 시 목록 선택 방지
                        handleDeleteClick(analysis.id);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div>데이터가 없습니다.</div>
          )}
          <div ref={observerRef} className={styles.loader}>
            {isLoadingAnalyses && "로딩 중..."}
          </div>
        </div>
      </div>
      <AnalysisDetail />
      <DeleteAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} analysisId={selectedAnalysisId} />
    </div>
  );
}

export default Analysis;
