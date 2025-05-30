import React, { useState, useRef, useEffect } from "react";
import styles from "./AnalysisDetail.module.scss";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { useFetchAnalysis } from "api/analysisApi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import { MdOutlineArrowDownward } from "react-icons/md";
import AnalysisDetailSkeleton from "./AnalysisDetailSkeleton";
import { RadarChart } from "components/analysis";
import AnalysisError from "./AnalysisError";
import ShinyText from "components/shared/shiny-text";

function AnalysisDetail() {
  const [inputVisible, setInputVisible] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const rightSectionRef = useRef(null);
  const [currentPhaseText, setCurrentPhaseText] = useState("분석 준비 중...");
  const [agentWebSearch, setAgentWebSearch] = useState({ title: "", url: "" });
  const [scoreX, setScoreX] = useState(0);
  const [scoreY, setScoreY] = useState(0);
  const [scoreZ, setScoreZ] = useState(0);
  const [benchmarkX, setBenchmarkX] = useState(0);
  const [benchmarkY, setBenchmarkY] = useState(0);
  const [benchmarkZ, setBenchmarkZ] = useState(0);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const requestBody = location.state?.requestBody;

  useEffect(() => {
    if (!requestBody) return;

    const fetchStream = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/stream+json",
        },
        body: JSON.stringify(requestBody),
      });

      // if (!response.ok || !response.body) {
      //   console.error("응답 실패 또는 body 없음");
      //   return;
      // }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        try {
          // 서버가 한 번에 하나의 JSON만 주므로, 버퍼에 전체가 들어온 시점에 파싱 시도
          const parsed = JSON.parse(buffer);
          console.log("Parsed event:", parsed);

          if (parsed.event === "final_report") {
            setStreamingContent((prev) => (prev || "") + parsed.content.replace(/\u00A0/g, " "));
          } else if (parsed.event === "created_report") {
            setStreamingContent(parsed.content.replace(/\u00A0/g, " "));
          } else if (parsed.event === "agent_web_search") {
            const { title, url } = parsed;
            setAgentWebSearch({ title, url });
          } else if (parsed.event === "phase_change") {
            const phaseMap = {
              scheme_phase: "정보 추출 중...",
              plan_phase: "에이전트 준비 중...",
              tool_use_phase: "인터넷/데이터베이스 검색 중...",
              analysis_phase: "보고서 작성 시작...",
              complete_phase: "분석 완료!",
            };
            const newPhaseText = phaseMap[parsed.current_phase] || "처리 중...";
            setCurrentPhaseText(newPhaseText);
            setAgentWebSearch({ title: "", url: "" });
          } else if (parsed.event === "error_detection") {
            setError(parsed.value);
            if (parsed.value) reader.cancel();
          } else if (parsed.event === "validation_error") {
            setError(true);
            reader.cancel();
          } else if (parsed.event === "current_stats") {
            const { score_x_axis, score_y_axis, score_z_axis } = parsed;
            setScoreX(score_x_axis);
            setScoreY(score_y_axis);
            setScoreZ(score_z_axis);
          } else if (parsed.event === "past_stats") {
            const { score_x_axis, score_y_axis, score_z_axis } = parsed;
            setBenchmarkX(score_x_axis);
            setBenchmarkY(score_y_axis);
            setBenchmarkZ(score_z_axis);
          }

          // 다음 JSON 수신을 위해 버퍼 비움
          buffer = "";
        } catch (err) {
          // 아직 JSON이 완성되지 않았거나 잘못된 경우: 다음 chunk를 기다림
          // console.log("JSON incomplete, waiting for more data...");
        }
      }
    };

    fetchStream();
  }, [requestBody]);

  // useEffect(() => {
  //   const eventSource = new EventSource(`${process.env.REACT_APP_BASE_URL}/stream/analysis`, {
  //     withCredentials: true,
  //   });

  //   eventSource.onmessage = (event) => {
  //     try {
  //       const parsed = JSON.parse(event.data);

  //       if (parsed.event === "final_report") {
  //         setStreamingContent((prev) => (prev || "") + parsed.content.replace(/\u00A0/g, " "));
  //       } else if (parsed.event === "created_report") {
  //         setStreamingContent(parsed.content.replace(/\u00A0/g, " "));
  //       } else if (parsed.event === "agent_web_search") {
  //         const { title, url } = parsed;
  //         setAgentWebSearch({ title, url });
  //       } else if (parsed.event === "phase_change") {
  //         const phaseMap = {
  //           scheme_phase: "정보 추출 중...",
  //           plan_phase: "에이전트 준비 중...",
  //           tool_use_phase: "인터넷/데이터베이스 검색 중...",
  //           analysis_phase: "보고서 작성 시작...",
  //           complete_phase: "분석 완료!",
  //         };
  //         const newPhaseText = phaseMap[parsed.current_phase] || "처리 중...";
  //         setCurrentPhaseText(newPhaseText);
  //         setAgentWebSearch({ title: "", url: "" });
  //       } else if (parsed.event === "error_detection") {
  //         setError(parsed.value);
  //         if (parsed.value) eventSource.close();
  //       } else if (parsed.event === "validation_error") {
  //         setError(true);
  //         eventSource.close();
  //       } else if (parsed.event === "current_stats") {
  //         const { score_x_axis, score_y_axis, score_z_axis } = parsed;
  //         setScoreX(score_x_axis);
  //         setScoreY(score_y_axis);
  //         setScoreZ(score_z_axis);
  //       } else if (parsed.event === "past_stats") {
  //         const { score_x_axis, score_y_axis, score_z_axis } = parsed;
  //         setBenchmarkX(score_x_axis);
  //         setBenchmarkY(score_y_axis);
  //         setBenchmarkZ(score_z_axis);
  //       }
  //     } catch (err) {
  //       console.error("Failed to parse SSE message:", err);
  //     }
  //   };

  //   eventSource.onerror = (error) => {
  //     console.error("SSE Error:", error);
  //     eventSource.close();
  //   };

  //   return () => {
  //     eventSource.close(); // 컴포넌트 언마운트 시 해제
  //   };
  // });

  useEffect(() => {
    const element = rightSectionRef.current;
    if (!element) return;

    handleScroll();

    element.addEventListener("scroll", handleScroll);
    return () => element.removeEventListener("scroll", handleScroll);
  }, [rightSectionRef?.current, streamingContent]);

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

  const toggleInputVisibility = () => {
    setInputVisible((prev) => !prev);
  };

  return (
    <div className={styles.analysisDetail} ref={rightSectionRef}>
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
            <div className={styles.input}> {JSON.parse(`"${requestBody?.input}"`)}</div>
            <div className={styles.companyAndPosition}>
              <div className={styles.companyWrapper}>
                <div className={styles.subTitle}>지원 회사명</div>
                <div className={styles.input}>{requestBody?.company}</div>
              </div>
              <div className={styles.positionWrapper}>
                <div className={styles.subTitle}>지원 직무</div>
                <div className={styles.input}>{requestBody?.position}</div>
              </div>
            </div>
          </div>
          <div className={styles.contentWrapper}>
            {benchmarkX !== 0 && (
              <RadarChart
                x={scoreX}
                y={scoreY}
                z={scoreZ}
                benchmarkX={benchmarkX}
                benchmarkY={benchmarkY}
                benchmarkZ={benchmarkZ}
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
    </div>
  );
}

export default AnalysisDetail;
