import React from "react";
import styles from "./Intro.module.scss";

function Intro() {
  return (
    <div className={styles.intro}>
      <h2>자소서 역량평가 AI 챗봇</h2>

      <section>
        <h3>개요</h3>
        <p>
          지원자의 자기소개서, 포트폴리오, 영상 데이터 등 다양한 자료를 AI 챗봇이 분석하여, 개인의 학습 능력(X축), 직무
          적합성(Y축), 수행 역량(Z축)을 종합 평가해 주는 솔루션입니다.
        </p>
        <p>
          전통적인 2D 평가(지식 또는 기술 중심)에서 확장된 3D 평가 모델을 사용함으로써, 마인드셋, 직무 요구 역량,
          프로젝트 수행 능력 등을 파악할 수 있습니다.
        </p>
      </section>

      <section>
        <h3>주요 기능</h3>
        <ul>
          <li>
            <strong>AI 기반 자동 분석</strong> - NLP(자연어 처리), 딥러닝 등을 통해 자기소개서와 여러 데이터를
            정량화하고, 3D 그래프나 대시보드로 결과를 시각화합니다.
          </li>
          <li>
            <strong>미래 직업 동향 반영</strong> - WEF 보고서, LinkedIn 등에서 수집한 최신 채용 트렌드를 토대로 평가
            기준을 자동 업데이트합니다.
          </li>
          <li>
            <strong>맞춤형 피드백 및 실행 계획 제공</strong>
            <ul>
              <li>X축(학습 능력) 보완: 추천 강의, 학습 플랫폼 안내(Coursera, edX 등)</li>
              <li>Y축(직무 적합성) 보완: 직무 맞춤형 프로젝트나 멘토링 프로그램 연결</li>
              <li>Z축(수행 역량) 보완: Kaggle, 해커톤, 조직 내 실무 프로젝트 참여 기회 제안</li>
            </ul>
          </li>
          <li>
            <strong>재평가 루프</strong> - 3~6개월 간격으로 재평가를 실시해 사용자 역량 변화 추이를 파악하고, 다음
            목표치를 제시함으로써 지속 성장과 역량 고도화를 지원합니다.
          </li>
        </ul>
      </section>

      <section>
        <h3>적용 사례</h3>
        <ul>
          <li>
            <strong>기업 채용</strong> - 데이터 사이언티스트 등 첨단 분야 채용 시, 수백~수천 명의 지원자를 AI로 빠르게
            분석하여 상위 우수 인재를 선별하고, 부족 역량을 파악해 보충 학습 기회를 제공합니다.
          </li>
          <li>
            <strong>취업 준비생 개인 컨설팅</strong> - 지원자가 자기소개서와 포트폴리오를 업로드하면, AI 챗봇이 현재
            역량(X, Y, Z)을 점수화하고 부족한 부분별 활동 계획을 안내해 합격률을 높입니다.
          </li>
          <li>
            <strong>조직 내 역량 관리</strong> - 재직자들의 역량을 주기적으로 평가·분석하여, 인재 배치 최적화와 프로젝트
            성과 향상을 유도합니다.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Intro;
