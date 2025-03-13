import React from "react";
import styles from "./Evaluation3D.module.scss";

function Evaluation3D() {
  return (
    <div className={styles.evaluation3D}>
      <h1>3D 역량 분석이란?</h1>

      <section>
        <h2>배경이론</h2>
        <p>
          <strong>Kolb(1984):</strong> 경험학습 이론(Experiential Learning)을 통해 학습 경험과 반성적 사고가 개인의 역량
          향상에 긴밀히 연결됨을 강조.
        </p>
        <p>
          <strong>Dweck(2006):</strong> “Growth Mindset” 이론을 통해 개인이 학습과 도전에 임하는 태도(학습 수준, 성장
          가능성)가 중요한 성공 요소임을 시사.
        </p>
        <p>
          <strong>Holland, Boyatzis:</strong> 직무 적합성과 리더십, 성과 등 다양한 역량을 평가하는 여러 프레임워크를
          제시.
        </p>
      </section>

      <section>
        <h2>3D 모델의 구성</h2>
        <h3>X축 (학습 수준)</h3>
        <p>성장 마인드셋, 신기술 학습 속도, 학습 이력 등을 정량적으로 측정.</p>
        <p>예) AI, 빅데이터 등 최신 기술을 얼마나 빠르게 학습하고 적용하는지, 실패 경험에서 얼마나 학습하는지.</p>

        <h3>Y축 (직무 적합성)</h3>
        <p>특정 직무가 요구하는 역량과 개인의 역량 간 매칭도를 측정.</p>
        <p>예) 데이터 사이언티스트로서 통계 역량, 프로그래밍 능력, 도메인 이해도, 팀 협업 성향 등.</p>

        <h3>Z축 (수행 역량)</h3>
        <p>실제 성과(KPI), 프로젝트 완성도, 문제 해결 능력, 리더십 등을 종합 측정.</p>
        <p>예) 프로젝트에서 어떤 성과를 냈는지, 협업 환경에서 리더십과 팔로워십을 어떻게 발휘했는지.</p>
      </section>

      <section>
        <h2>평가 방식</h2>
        <ul>
          <li>
            <strong>다중 모달 데이터 분석:</strong> 자기소개서 텍스트, 포트폴리오(코드, 디자인 시안 등),
            영상(발표·인터뷰 영상) 데이터를 NLP, 텍스트 마이닝, 컴퓨터 비전 기술로 분석하여 정량적 점수를 산출.
          </li>
          <li>
            <strong>데이터베이스 연동:</strong> 기업·직무별로 필요한 역량 지표와 기존 합격자의 평균치를 참조해, 지원자의
            (X, Y, Z) 점수를 상대 비교.
          </li>
          <li>
            <strong>시각화:</strong> 3D 그래프, 레이더 차트, 대시보드 등을 통해 한눈에 강·약점을 파악할 수 있도록 제공.
          </li>
        </ul>
      </section>

      <section>
        <h2>활용 가치</h2>
        <ul>
          <li>
            <strong>입체적 역량 파악:</strong> 기존의 단순 필기·면접 평가가 아닌, 학습 태도·직무 핏·성과 역량 등을
            복합적으로 측정하여 높은 신뢰도 확보.
          </li>
          <li>
            <strong>학습동기 부여와 리스크 최소화:</strong> 지원자·재직자 모두 현재 수준과 잠재력을 정확히 파악해 맞춤형
            보완 학습을 진행할 수 있음.
          </li>
          <li>
            <strong>DX 시대 최적화:</strong> WEF(세계경제포럼) 보고서에서 언급된 바와 같이, 새 기술 및 능력을 지속적으로
            학습해야 하는 미래 업무 환경에 대비 가능.
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Evaluation3D;
