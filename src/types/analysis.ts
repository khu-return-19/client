// NOTE: useLocation의 state 타입
export interface RequestBody {
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

// NOTE: useLocation의 state 객체 타입
export interface LocationState {
  requestBody?: RequestBody;
}

// NOTE: 에이전트 웹 검색 결과 타입
export interface AgentWebSearch {
  title: string;
  url: string;
}

// NOTE: 3D 차트 점수 타입
export interface Score {
  x: number;
  y: number;
  z: number;
}

// NOTE: SSE 스트림 이벤트 타입
export type StreamEvent =
  | { event: "created_report"; content: string }
  | { event: "final_report"; content: string }
  | { event: "agent_web_search"; title: string; url: string }
  | { event: "phase_change"; current_phase: string }
  | { event: "current_stats"; score_x_axis: number; score_y_axis: number; score_z_axis: number }
  | { event: "past_stats"; score_x_axis: number; score_y_axis: number; score_z_axis: number }
  | { event: "error_detection"; value: boolean }
  | { event: "validation_error" }
  | { event: string; [key: string]: any };

// NOTE: useAnalysisStream hook의 반환 타입
export interface UseAnalysisStreamReturn {
  error: boolean;
  streamingContent: string;
  currentPhaseText: string;
  agentWebSearch: AgentWebSearch;
  score: Score;
  benchmark: Score;
}
