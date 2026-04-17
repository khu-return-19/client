export interface CreateAnalysisData {
  userId: string;
  questionList: string[];
  answerList: string[];
  education: string; // 대학교 + 졸업 여부 문자열로 보내기
  gpa: number; // 학점
  major: string; // 전공
  backgroundCareerAward: string; // 수상실적 (,로 구분된 문자열)
  linguisticAbility: string; // 어학점수 (,로 구분된 문자열)
  certificates: string; // 자격증
  company: string; // 지원 회사명
  jobPosition: string; // 지원 직무명
  jobField: string; // 직군
  division: string; // 부서
  applyUrl: string; // 지원 링크
}

// 스트리밍 이벤트 type 종류
export type AnalysisEventType =
  | "schemer_start"
  | "schemer_result"
  | "schemer_end"
  | "web_search_start"
  | "web_search_planning"
  | "web_search_plan_generated"
  | "web_search_query"
  | "web_search_result"
  | "web_search_end"
  | "pass_score"
  | "evaluate_start"
  | "evaluate_generation"
  | "evaluate_result"
  | "evaluate_end"
  | "revise_start"
  | "revise_generation"
  | "revise_result"
  | "final_state";

export type AnalysisEventStatus = "RUNNING" | "COMPLETED" | "FAILED";

export interface SchemerResultData {
  is_question_valid: boolean;
  is_answer_valid: boolean;
  validation_reason: string;
}

// web_search_plan_generated
export interface SearchPlanItem {
  tool_type: string;
  query: string;
  purpose: string;
}

// web_search_query
export interface SearchQueryData {
  tool_type: string;
  query: string;
  purpose: string;
}

// web_search_result
export interface SearchResultItem {
  url: string;
  content: string;
}
export interface SearchResultData {
  answer: string;
  items: SearchResultItem[];
}

// evaluate_result
export interface AxisScore {
  score: number;
  criteria: string[];
  basis: string[];
  summary: string;
  compareScore: number; // 합격자 평균 점수
}

export interface ImproveStrategy {
  strategyName: string;
  actionItems: string[];
}
export interface EvaluateResultData {
  x: AxisScore;
  y: AxisScore;
  z: AxisScore;
  roleFit: string;
  domainFit: string;
  cultureFit: string;
  skillFit: string;
  compareProb: string[]; // 합격 가능성 비교
  scoreSummary: string[];
  level: string; // 경쟁력 (매우 높음, 높음, 보통, 낮음, 매우 낮음)
  jobSummary: string;
  overall: string;
  strength: string[];
  weakness: string[];
  advice: string[];
  improveOverall: string[];
  improveStrategy: ImproveStrategy[];
  improveExpectation: string[];
}

// revise_result
export interface ReviseResultData {
  best_reply: string[];
  reply_reason: string[];
  expectation: string[];
}

// final_state
export interface FinalStateData {
  analyzerRetryCount: number;
  answerList: string[];
  applyUrl: string | null;
  backgroundCareerAward: string | null;
  certificates: string;
  company: string;
  contextDB: string | null;
  contextWeb: string | null;
  division: string | null;
  education: string;
  evaluationResult: EvaluateResultData;
  gpa: string | null;
  isEvaluationPassed: boolean;
  jobField: string | null;
  jobPosition: string;
  linguisticAbility: string | null;
  major: string;
  planResult: string | null;
  questionList: string[];
  revisedResult: ReviseResultData;
  schemaResult: boolean;
  userId: string | null;
}

// 이벤트 data 타입 매핑
export interface AnalysisEventDataMap {
  schemer_start: string;
  schemer_result: SchemerResultData;
  schemer_end: string;
  web_search_start: string;
  web_search_planning: string;
  web_search_plan_generated: SearchPlanItem[];
  web_search_query: SearchQueryData;
  web_search_result: SearchResultData;
  web_search_end: string;
  pass_score: null;
  evaluate_start: string;
  evaluate_generation: string;
  evaluate_result: EvaluateResultData;
  evaluate_end: string;
  revise_start: string;
  revise_generation: string;
  revise_result: ReviseResultData;
  final_state: FinalStateData;
}

// 최종 이벤트 타입
export interface AnalysisEvent<
  T extends AnalysisEventType = AnalysisEventType,
> {
  id: string;
  type: T;
  status: AnalysisEventStatus;
  data: AnalysisEventDataMap[T];
}
