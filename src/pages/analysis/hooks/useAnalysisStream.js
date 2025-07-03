import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useAnalysisStream = (requestBody) => {
  const [streamingContent, setStreamingContent] = useState("");
  const [currentPhaseText, setCurrentPhaseText] = useState("분석 준비 중입니다.");
  const [agentWebSearch, setAgentWebSearch] = useState({ title: "", url: "" });
  const [score, setScore] = useState({ x: 0, y: 0, z: 0 });
  const [benchmark, setBenchmark] = useState({ x: 0, y: 0, z: 0 });
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!requestBody) return setError(true);

    const fetchStream = async () => {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/analysis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok || !response.body) return setError(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data:")) continue;
          const jsonStr = trimmed.slice("data:".length).trim();

          try {
            const parsed = JSON.parse(jsonStr);
            const { event } = parsed;

            switch (event) {
              case "created_report":
                setStreamingContent(parsed.content.replace(/\u00A0/g, " "));
                break;
              case "final_report":
                setStreamingContent((prev) => (prev || "") + parsed.content.replace(/\u00A0/g, " "));
                break;
              case "agent_web_search":
                setAgentWebSearch({ title: parsed.title, url: parsed.url });
                break;
              case "phase_change": {
                const phaseMap = {
                  scheme_phase: "정보 추출 중입니다.",
                  plan_phase: "에이전트에 연결 중입니다.",
                  tool_use_phase: "웹 페이지와 데이터베이스를 조회하고 있습니다.",
                  analysis_phase: "보고서 작성을 시작합니다.",
                };
                setCurrentPhaseText(phaseMap[parsed.current_phase] || "처리 중입니다.");
                setAgentWebSearch({ title: "", url: "" });

                if (parsed.current_phase === "complete_phase") {
                  toast.success(
                    <div>
                      <strong>분석이 완료되었습니다!</strong>
                      <div style={{ marginTop: "4px" }}>분석보고서는 이메일로 전송됩니다.</div>
                    </div>,
                    { autoClose: 5000 }
                  );
                }
                break;
              }
              case "current_stats":
                setScore({
                  x: parsed.score_x_axis,
                  y: parsed.score_y_axis,
                  z: parsed.score_z_axis,
                });
                break;
              case "past_stats":
                setBenchmark({
                  x: parsed.score_x_axis,
                  y: parsed.score_y_axis,
                  z: parsed.score_z_axis,
                });
                break;
              case "error_detection":
                setError(parsed.value);
                if (parsed.value) reader.cancel();
                break;
              case "validation_error":
                setError(true);
                reader.cancel();
                break;

              default:
                break;
            }
          } catch (_) {}
        }
      }
    };

    fetchStream();
  }, [requestBody]);

  return {
    error,
    streamingContent,
    currentPhaseText,
    agentWebSearch,
    score,
    benchmark,
  };
};
