import React, { useState, useRef, useEffect } from "react";
import styles from "./Analysis.module.scss";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { MdOutlineArrowDownward } from "react-icons/md";
import { AnalysisError, OriginalResumeSection } from "layouts/analysis";
import { RadarChart, Notification } from "components/analysis";
import ShinyText from "components/shared/shiny-text";
import { useAnalysisStream } from "../hooks/useAnalysisStream";

function Analysis() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const rightSectionRef = useRef(null);

  const location = useLocation();
  const requestBody = location.state?.requestBody;

  const { error, streamingContent, currentPhaseText, agentWebSearch, score, benchmark } =
    useAnalysisStream(requestBody);

  useEffect(() => {
    const element = rightSectionRef.current;
    if (!element) return;

    handleScroll();

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [rightSectionRef?.current, streamingContent]);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // 스크롤 감지 핸들러
  const handleScroll = () => {
    const element = rightSectionRef.current;
    if (!element) return;

    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 1;
    setShowScrollButton((prev) => !isAtBottom);
  };

  // 버튼 클릭 시 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    rightSectionRef.current?.scrollTo({
      top: rightSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  // if (error) {
  //   return <AnalysisError />;
  // }

  return (
    <div className={styles.analysis} ref={rightSectionRef}>
      <div className={styles.rightWraaper}>
        <div className={styles.title}>분석 레포트</div>
        <div className={styles.content}>
          <OriginalResumeSection requestBody={requestBody} />
          <div className={styles.contentWrapper}>
            {benchmark.x !== 0 && (
              <RadarChart
                x={score.x}
                y={score.y}
                z={score.z}
                benchmarkX={benchmark.x}
                benchmarkY={benchmark.y}
                benchmarkZ={benchmark.z}
              />
            )}
            {streamingContent ? (
              <ReactMarkdown
                className={styles.streaming}
                remarkPlugins={[remarkGfm, remarkBreaks]}
                rehypePlugins={[rehypeRaw]}
              >
                {streamingContent}
              </ReactMarkdown>
            ) : (
              <div className={styles.description}>
                <div className={styles.spinner} />
                <ShinyText text={currentPhaseText} speed={3} />
                {agentWebSearch.title && (
                  <div className={styles.agentWebSearch}>
                    <img src={`http://www.google.com/s2/favicons?domain=${agentWebSearch.url}`} alt="" />
                    {agentWebSearch && <span>{agentWebSearch.title}</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={scrollToBottom}
        className={`${styles.scrollToBottomButton} ${showScrollButton ? styles.show : ""}`}
      >
        <MdOutlineArrowDownward />
      </button>

      <Notification />
    </div>
  );
}

export default Analysis;
