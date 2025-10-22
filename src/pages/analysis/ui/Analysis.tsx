import React, { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Analysis.module.scss";
import { useLocation } from "react-router-dom";
import { MdOutlineArrowDownward } from "react-icons/md";
import { AnalysisError, OriginalResumeSection, AnalysisContentWrapper } from "layouts/analysis";
import { Notification } from "components/analysis";
import { useAnalysisStream } from "../hooks/useAnalysisStream";

interface RequestBody {
  company: string;
  position: string;
  input: string;
  url: string;
  email: string;
  accessCode: number;
  resume: {
    major: string;
    universityName: string;
    gpa: number;
    career: string;
    languageScore: string;
    certificate: string;
  };
}

interface LocationState {
  requestBody?: RequestBody;
}

const Analysis: React.FC = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);
  const rightSectionRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const requestBody = state?.requestBody;

  const { error, streamingContent, currentPhaseText, agentWebSearch, score, benchmark } =
    useAnalysisStream(requestBody);

  // NOTE: 스크롤 감지 핸들러
  const handleScroll = useCallback(() => {
    const element = rightSectionRef.current;
    if (!element) return;

    const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) <= 1;
    setShowScrollButton(!isAtBottom);
  }, []);

  useEffect(() => {
    const element = rightSectionRef.current;
    if (!element) return;

    handleScroll();

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    handleScroll();
  }, [streamingContent, handleScroll]);

  // NOTE: 페이지 이탈 방지
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  // NOTE: 버튼 클릭 시 스크롤 맨 아래로 이동
  const scrollToBottom = () => {
    rightSectionRef.current?.scrollTo({
      top: rightSectionRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  if (error) {
    return <AnalysisError />;
  }

  return (
    <div className={styles.analysis} ref={rightSectionRef}>
      <div className={styles.wraaper}>
        <div className={styles.title}>분석 레포트</div>
        <div className={styles.content}>
          <OriginalResumeSection requestBody={requestBody} />
          <AnalysisContentWrapper
            score={score}
            benchmark={benchmark}
            streamingContent={streamingContent}
            currentPhaseText={currentPhaseText}
            agentWebSearch={agentWebSearch}
          />
        </div>
      </div>
      <button
        onClick={scrollToBottom}
        className={`${styles.scrollToBottomButton} ${showScrollButton ? styles.show : ""}`}
      >
        <span>
          <MdOutlineArrowDownward />
        </span>
      </button>

      <Notification />
    </div>
  );
};

export default Analysis;
