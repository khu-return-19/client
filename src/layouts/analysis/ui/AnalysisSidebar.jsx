import React, { useState, useRef, useEffect } from "react";
import styles from "./AnalysisSidebar.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { useFetchAnalyses } from "api/analysisApi";
import { mergeNewData } from "pages/analysis/utils/mergeNewData";
import { DeleteAnalysisModal } from "layouts/analysis";

function AnalysisSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [groupedAnalyses, setGroupedAnalyses] = useState({});
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [analysisToDelete, setAnalysisToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, fetchNextPage, hasNextPage } = useFetchAnalyses();

  useEffect(() => {
    if (id) {
      setSelectedAnalysisId(Number(id));
    }
  }, [id]);

  // TODO: 삭제와 추가로 인한 데이터 업데이트에서 시간복잡도 관련 최적화 필요
  useEffect(() => {
    if (data?.pages) {
      const newAnalyses = data.pages.at(-1);
      const allAnalyses = data.pages.flat();

      setGroupedAnalyses((prevGrouped) => mergeNewData(prevGrouped, newAnalyses, allAnalyses));
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
    setAnalysisToDelete(analysisId);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className={`${styles.analysisSidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
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
        <div className={`${styles.list} ${isCollapsed ? styles.collapsed : styles.expanded}`}>
          {Object.keys(groupedAnalyses).length > 0 &&
            Object.entries(groupedAnalyses).map(([category, analyses]) => (
              <div key={category} className={styles.category}>
                <div className={styles.categoryTitle}>{category}</div>
                {analyses.map((analysis) => (
                  <div
                    key={analysis.id}
                    className={`${styles.analysisItem} ${selectedAnalysisId === analysis.id ? styles.selected : ""}`}
                    onClick={() => {
                      handleAnalysisSelect(analysis.id);
                    }}
                  >
                    <div className={styles.title}>{analysis.title}</div>
                    <div
                      className={styles.deleteButton}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(analysis.id);
                      }}
                    >
                      <AiOutlineClose />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          <div ref={observerRef} className={styles.loader}>
            {isLoading && <div className={styles.spinner}></div>}
          </div>
        </div>
        <DeleteAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} analysisId={analysisToDelete} />
      </div>
      <div className={`${styles.overlay} ${!isCollapsed ? styles.visible : ""}`} onClick={() => setIsCollapsed(true)} />
    </>
  );
}

export default AnalysisSidebar;
