import React from "react";
import styles from "./AnalysisDetail.module.scss";
import ReactMarkdown from "react-markdown";

const mockData = {
  id: 1,
  title: "프론트엔드 개발 자기소개서 분석",
  description: "이 자기소개서는 프론트엔드 개발 직군 지원을 위해 작성되었습니다.",
  body: `
# 자기소개서 분석

## 1. 개요
이 문서는 지원자가 작성한 자기소개서를 분석한 결과를 제공합니다.

## 2. 강점 분석
- **UI/UX에 대한 관심**: 사용자의 경험을 고려한 개발 방식 언급
- **React 활용 경험**: 개인 프로젝트에서 React를 사용한 경험 설명
- **협업 경험**: 팀 프로젝트 경험과 코드 리뷰 경험 강조

## 3. 개선점
- 프로젝트에서의 **구체적인 역할과 기여도** 추가 필요
- 협업 경험에서 **사용한 기술 및 도구** (예: Git, Jira 등) 추가하면 좋음
- 자기소개서의 문장을 더 **간결하게 정리**할 필요 있음
  `,
};

function AnalysisDetail() {
  return (
    <div className={styles.analysisDetail}>
      <div className={styles.container}>
        <div className={styles.title}>분석 보고서</div>
        <div className={styles.horizontalLine}></div>
        <div className={styles.content}>
          <div className={styles.contentTitle}>{mockData.title}</div>
          <div className={styles.description}>{mockData.description}</div>
          <div className={styles.body}>
            <ReactMarkdown>{mockData.body}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalysisDetail;
