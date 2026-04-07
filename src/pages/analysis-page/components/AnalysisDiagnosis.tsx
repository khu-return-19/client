import cn from "utils/cn";
import ReportGraph from "pages/report/components/ReportGraph";

export default function AnalysisDiagnosis() {
  const sections = [
    {
      axis: "X",
      title: "X축 (학습수준) 평가",
      score: "4.1점",
      scoreText:
        "국제 학술대회/대외공모전(Top100) 실적, 실제 서비스 출시 및 학술 활동, 이론+실무 수준 모두 우수",
      criteria: [
        "(컴퓨터융합/IT개발) 연구개발·생산 직군 평가를 기준 평가로 적용",
        "이론적 기반, 전공 학점 성적, 프로젝트/대회 경험, 실무 프로젝트 경험 포함 평가",
        "SCI/SCIE 논문, 대형 공모전, 인턴/교내 프로젝트 등으로 가산",
      ],
      evidence: [
        "전공(컴퓨터융합), **GPA 4.3(정성평)**, 3.94(교과대)**로 학업 우수, 이론 베이스가 강함",
        "Java, Flutter, Android, VM/Garbage Collection 등 컴퓨터공학 핵심 기술에 대한 구체적 학습 언급",
        "Google Solution Challenge Global Top100, 학회·스터디 등 대외경험",
        "이학계열 SCI/SCIE 논문, 학점 트랙(학부) 수준에서 충분히 경쟁력 보유",
      ],
      chartLabels: ["X", "4.1", "4.0", "4.2"],
    },
    {
      axis: "Y",
      title: "Y축 (직무적합성 수준) 평가",
      score: "4.0점",
      scoreText:
        "실제 서비스 구현+지속적 개선 경험, 최신 트렌드 사례, 글로벌 공모전에서 검증된 팀워크 역량까지 보유",
      criteria: [
        "(연구개발/생산) 직무 직접 관련 경험, 프로젝트 리더, 결과물, S/W 개발 직무 적합성",
        "실무 프로젝트/대회 공모전 경험, 서비스 출시 중심으로 가산",
      ],
      evidence: [
        "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        "직접 서비스 출시 및 애플리케이션 유지보수의 소통 경험(팀원 협업과 관리 능력 포함)",
        "Google Solution Challenge 등 대회경험과 팀워크 역량 증명(Top 100)",
        "Back-End/Tech_SW개발 중심에 부합하는 광고/공모전 Tech동향/F4E 참여 활동 약간 내",
      ],
      extraItems: [
        {
          label: "Role Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Domain Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Culture Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
        {
          label: "Skill Fit",
          text: "모바일(Flutter/Android), Back-End와의 연계, 서버-아키텍처 이해도 강조",
        },
      ],
      chartLabels: ["Y", "4.0", "4.1", "4.2"],
    },
    {
      axis: "Z",
      title: "Z축 (수행역량 수준) 평가",
      score: "4.2점",
      scoreText:
        "실제 서비스 완성형 개선(지속적 개선 프로세스, 피드백 루프, 실험적 문제해결력, 구체적 수치 기반 성과)",
      criteria: [
        "(연구개발/생산) 실질적 성과/결과, 실무 적용, 문제 해결력, 결과물/기여도 집중",
        "서비스 출시, 사용자 피드백 반영, 성능·안정성 향상 노력에 가산점",
      ],
      evidence: [
        "실제 기획/상용 앱 서비스 출시 유지보수(시장 검증) 지속적 피드백 및 유지보수",
        "사용자 피드백 수집, 성능/안정성 향상 반복 구현(실무형 기여도 상승)",
        "사용자 중심 설계로 VR 프로젝트 구현 및 완성도 점수 향상(정량적 사례 포함)",
        "팀 프로젝트 내 역할 명확화, 협업과 기술적 성과 하이라이트",
      ],
      chartLabels: ["Z", "4.2", "4.0", "4.1"],
    },
  ];

  const labelStyle = "font-medium text-[16px] text-gray900 shrink-0";

  return (
    <section>
      <h2 className="text-navy900 font-semibold text-2xl mb-10">
        3D 평가 세부 결과
      </h2>
      {sections.map((section) => (
        <div className="mb-[10px]">
          <h3 className="font-semibold text-lg">{section.title}</h3>
          <div className="flex mt-4 w-full gap-10">
            <div className="w-[350px]">
              <ReportGraph position={-1} />
            </div>
            <div>
              <div className="flex gap-8 mb-10">
                <h4 className={labelStyle}>평가 기준</h4>
                <div className="flex flex-col gap-[6px]">
                  {section.criteria.map((criterion, index) => (
                    <p key={index}>• {criterion}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 mb-10">
                <h4 className={labelStyle}>평가 근거</h4>
                <div className="flex flex-col gap-[6px]">
                  {section.evidence.map((evidence, index) => (
                    <p key={index}>• {evidence}</p>
                  ))}
                </div>
              </div>
              <div className="flex gap-8 mb-10">
                <h4 className={cn(labelStyle, "mt-[2px]")}>
                  {section.axis}축 점수
                </h4>
                <div className="flex flex-col gap-[10px]">
                  <div className="text-[#2876F1] text-xl font-semibold">
                    {section.score}
                  </div>
                  <div>{section.scoreText}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
