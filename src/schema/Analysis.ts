export interface CreateAnalysisData {
  userId: string;
  accessCode: string; // 인증코드 숫자
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
