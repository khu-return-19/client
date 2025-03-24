import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import styles from "./Analysis.module.scss";
import { useFetchAnalyses, useFetchAnalysis, useDeleteAnalyses } from "api/analysisApi";
import { mergeNewData } from "pages/analysis/utils/mergeNewData";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import dayjs from "dayjs";
import ReactMarkdown from "react-markdown";
import { AiOutlineClose } from "react-icons/ai";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import Modal from "shared/modal";
import { DeleteAnalysisModal } from "layouts/analysis";
import { MdOutlineArrowDownward } from "react-icons/md";

function Analysis() {
  const [isActive, setIsActive] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [groupedAnalyses, setGroupedAnalyses] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [inputVisible, setInputVisible] = useState(false);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState(null);
  const [streamingContent, setStreamingContent] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const rightSectionRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } = useFetchAnalyses();
  const observerRef = useRef(null);
  const { data: analysis } = useFetchAnalysis(id);

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

  useEffect(() => {
    if (!analysis || analysis.status !== null) return; // status가 null일 때만 실행

    const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/stream/analysis/${id}`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      setStreamingContent((prev) => prev + event.data.replace(/\u00A0/g, " "));
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close(); // 컴포넌트 언마운트 시 해제
    };
  }, [analysis, id]);

  const toggleInputVisibility = () => {
    setInputVisible((prev) => !prev);
  };

  const handleAnalysisSelect = (analysisId) => {
    setSelectedAnalysisId(analysisId);
    navigate(`/analysis/${analysisId}`);
  };

  const handleDeleteClick = (analysisId) => {
    setSelectedAnalysisId(analysisId);
    setIsModalOpen(true);
  };

  // 스크롤 감지 핸들러
  const handleScroll = () => {
    const element = rightSectionRef.current;
    if (!element) return;

    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 1;
    setShowScrollButton((prev) => !isAtBottom);
  };

  useEffect(() => {
    const element = rightSectionRef.current;
    if (!element) return;

    handleScroll();

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [rightSectionRef?.current, analysis?.content, streamingContent]);

  // 버튼 클릭 시 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    rightSectionRef.current?.scrollTo({
      top: rightSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return <div></div>;
  }

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
            {isLoading && "로딩 중..."}
          </div>
        </div>
      </div>
      <div className={styles.rightSection} ref={rightSectionRef}>
        <div className={styles.rightWraaper}>
          <div className={styles.title}>내 분석 레포트</div>
          <div className={styles.content}>
            <div className={styles.originalResumeButton} onClick={toggleInputVisibility}>
              <div>자소서 원본 보기</div>
              {inputVisible ? (
                <AiOutlineUp className={styles.toggleIcon} />
              ) : (
                <AiOutlineDown className={styles.toggleIcon} />
              )}
            </div>
            <div className={`${styles.originalResume} ${inputVisible ? styles.open : ""}`}>
              <div className={styles.resumeTitle}>자기소개서</div>
              <div className={styles.input}>{analysis?.input}</div>
              <div className={styles.companyAndPosition}>
                <div className={styles.companyWrapper}>
                  <div className={styles.subTitle}>지원 회사명</div>
                  <div className={styles.input}>{analysis?.company}</div>
                </div>
                <div className={styles.positionWrapper}>
                  <div className={styles.subTitle}>지원 직무</div>
                  <div className={styles.input}>{analysis?.position}</div>
                </div>
              </div>
            </div>
            {analysis?.status === null ? (
              <ReactMarkdown
                className={styles.streaming}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {JSON.parse(`"${streamingContent}"`) || "분석 중..."}
              </ReactMarkdown>
            ) : (
              <ReactMarkdown
                className={styles.body}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {JSON.parse(`"${analysis?.content}"`).replace(/\u00A0/g, " ")}
              </ReactMarkdown>
            )}
          </div>
        </div>
        <button
          onClick={scrollToBottom}
          className={`${styles.scrollToBottomButton} ${showScrollButton ? styles.show : ""}`}
        >
          <MdOutlineArrowDownward />
        </button>
      </div>
      <DeleteAnalysisModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} analysisId={selectedAnalysisId} />
    </div>
  );
}

export default Analysis;
