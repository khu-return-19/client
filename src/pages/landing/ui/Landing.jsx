import React, { useEffect, useState } from "react";
import styles from "./Landing.module.scss";
import { XCard, YCard, ZCard } from "components/landing";

function Landing() {
  const [isVisible, setIsVisible] = useState(false);

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleAuth = () => {
    window.location.href = "https://zackinthebox.shop/oauth2/authorization/google";
  };

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.landing}>
      <div className={styles.wrapper}>
        <div className={styles.intro}>
          <div className={styles.leftSection}>
            <div className={styles.title}>자기소개서 분석을 통해 합격 확률을 파악해요</div>
            <div>
              <div>정보만 입력하면 10초만에 분석</div>
              <div>
                내 이력과 자기소개서 작성을 입력하면 첨삭 N년의 컨설팅 전문 교수님의 데이터를 기반으로 한 분석이
                진행됩니다.
              </div>
            </div>
            <div>버튼</div>
            <div>내 자소서 첨삭 받기</div>
          </div>
          <div className={styles.rightSection}>
            <img src="https://picsum.photos/586/350" alt="임시 이미지" />
          </div>
        </div>

        <div className={styles.evaluation}>
          <div className={styles.titleSection}>
            <div>3D 모델을 통한 3가지 역량 평가</div>
            <div>지원자의 역량이 X, Y, Z 축의 3가지 평가 기준에 부합하는지 확인하고, 3D 그래프를 제시합니다.</div>
          </div>
          <div className={styles.content}>
            <img src="/3DEvaluation.png" alt="3D 역량 평가 이미지" className={styles.evaluationImage} />
            <div className={styles.xCard}>
              <XCard />
            </div>
            <div className={styles.yCard}>
              <YCard />
            </div>
            <div className={styles.zCard}>
              <ZCard />
            </div>
          </div>
        </div>

        <div className={styles.improvement}>
          <div className={styles.titleSection}>
            <div>개선방식 제안</div>
            <div>합격자 비교분석 구직자의 장단점 소개 및 개선 전략 제공</div>
          </div>
          <div className={styles.cardSection}>
            <img src="acceptedAnalysisCard.png" alt="" className={styles.acceptedAnalysisCard} />
            <img src="strengthsCard.png" alt="" className={styles.strengthsCard} />
            <img src="strategyCard.png" alt="" className={styles.strategyCard} />
            <img src="finalScoreCard.png" alt="" className={styles.finalScoreCard} />
          </div>
        </div>

        <div className={styles.resumeFeedback}>
          <div className={styles.titleSection}>
            <div>자기소개서 수정 및 평가</div>
            <div>개선제안을 반영한 자기소개서 및 3d 기반 합격률 재평가</div>
          </div>
          <div className={styles.cardSection}>
            <div className={styles.beforeCard}>
              <div>수정 전</div>
              <div>
                00동아리에서 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움이 있었습니다.
                <br />
                이에 따라 내용 요약 및 불필요한 부분 정리를 통해 회의록 작성의 효율성을 개선하였습니다.
              </div>
            </div>
            <div className={styles.afterCard}>
              <div>수정 후</div>
              <div>
                00동아리 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움을 인식했습니다.
                <br />
                000를 활용한 실시간 협업 시스템 도입과, 핵심 내용 요약 및 불필요한 부분 정리를 통해 <br />
                회의록 작성의 효율성을 약 20% 이상 개선하였습니다.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.botton}>
        <div className={styles.wrapper}>
          <div className={styles.sampleReport}>
            <div>
              예시 레포트를 통해 <br />
              결과를 자세히 보고 싶다면?
            </div>
            <div className={styles.sampleReportButton}>예시 레포트 보러 가기</div>
          </div>

          <div className={styles.partnership}>
            <div className={styles.title}>
              이 프로그램은 <br />
              00 연구와 함께합니다
            </div>
            <div className={styles.partnershipLogos}>
              <img src="https://picsum.photos/200/200" alt="임시 이미지" />
              <img src="https://picsum.photos/200/200" alt="임시 이미지" />
              <img src="https://picsum.photos/200/200" alt="임시 이미지" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
