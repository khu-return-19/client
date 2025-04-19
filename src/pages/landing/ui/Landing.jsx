import React, { useEffect, useState } from "react";
import styles from "./Landing.module.scss";
import { XCard, YCard, ZCard } from "components/landing";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";

// TODO: 이미지 전환 관련 로직 변경 필요!
const images = [
  "https://picsum.photos/id/101/586/350",
  "https://picsum.photos/id/102/586/350",
  "https://picsum.photos/id/103/586/350",
  "https://picsum.photos/id/104/586/350",
];

function Landing() {
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);

  // 자동 이미지 순환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  const [evalRef, evalInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [impRef, impInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [feedRef, feedInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [bottomRef, bottomInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });

  return (
    <div className={styles.landing}>
      <div className={styles.wrapper}>
        {isMobile || isTablet ? (
          <div className={styles.intro}>
            <div className={styles.leftSection}>
              <span className={styles.title}>
                자기소개서 분석을 통해 <br />
                <span className={styles.color}>합격 역량</span>을 파악해요
              </span>
              <div className={styles.description}>
                <span className={styles.subTitle}>1분 안에 무료 AI 분석</span>
                <span className={styles.text}>
                  컨설팅 전문 교수님 데이터 기반의 분석을 통해, <br />
                  필요한 역량과 개선된 자기소개서를 받아보세요.
                </span>
              </div>
              <img src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} className={styles.image} />
              <div className={styles.imageButtonGroup}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.imageButton} ${currentIndex === idx ? styles.active : ""}`}
                    onClick={() => handleClick(idx)}
                  />
                ))}
              </div>
              <div className={styles.analyzeButton} onClick={() => navigate("/analyze")}>
                내 자소서 첨삭 받기
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.intro}>
            <div className={styles.leftSection}>
              <span className={styles.title}>
                자기소개서 분석을 통해 <br />
                <span className={styles.color}>합격 역량</span>을 파악해요
              </span>
              <div className={styles.description}>
                <span className={styles.subTitle}>1분 안에 무료 AI 분석</span>
                <span className={styles.text}>
                  컨설팅 전문 교수님 데이터 기반의 분석을 통해, <br />
                  필요한 역량과 개선된 자기소개서를 받아보세요.
                </span>
              </div>
              <div className={styles.imageButtonGroup}>
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    className={`${styles.imageButton} ${currentIndex === idx ? styles.active : ""}`}
                    onClick={() => handleClick(idx)}
                  />
                ))}
              </div>
              <div className={styles.analyzeButton} onClick={() => navigate("/analyze")}>
                내 자소서 첨삭 받기
              </div>
            </div>
            <div className={styles.rightSection}>
              <img src={images[currentIndex]} alt={`이미지 ${currentIndex + 1}`} className={styles.image} />
            </div>
          </div>
        )}

        <motion.div
          ref={evalRef}
          initial={{ opacity: 0, y: 100 }}
          animate={evalInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.evaluation}
        >
          <div className={styles.titleSection}>
            <span className={styles.title}>3D 모델을 통한 3가지 역량 평가</span>
            <span className={styles.description}>
              지원자의 역량이 X, Y, Z 축의 3가지 평가 기준에 부합하는지 확인하고, 3D 그래프를 제시
            </span>
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
        </motion.div>

        <motion.div
          ref={impRef}
          initial={{ opacity: 0, y: 100 }}
          animate={impInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.improvement}
        >
          {" "}
          <div className={styles.titleSection}>
            <span className={styles.title}>개선방식 제안</span>
            <span className={styles.description}>합격자 비교분석 구직자의 장단점 소개 및 개선 전략 제공</span>
          </div>
          <div className={styles.cardSection}>
            <img src="acceptedAnalysisCard.png" alt="" className={styles.acceptedAnalysisCard} />
            <img src="strengthsCard.png" alt="" className={styles.strengthsCard} />
            <img src="strategyCard.png" alt="" className={styles.strategyCard} />
            <img src="finalScoreCard.png" alt="" className={styles.finalScoreCard} />
          </div>
        </motion.div>

        <motion.div
          ref={feedRef}
          initial={{ opacity: 0, y: 100 }}
          animate={feedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.resumeFeedback}
        >
          {" "}
          <div className={styles.titleSection}>
            <span className={styles.title}>자기소개서 수정 및 평가</span>
            <span className={styles.description}>개선제안을 반영한 자기소개서 및 3d 기반 합격률 재평가</span>
          </div>
          <div className={styles.cardSection}>
            <div className={styles.beforeCard}>
              <span>수정 전</span>
              <span>
                00동아리에서 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움이 있었습니다.
                <br />
                이에 따라 내용 요약 및 불필요한 부분 정리를 통해 회의록 작성의 효율성을 개선하였습니다.
              </span>
            </div>
            <div className={styles.afterCard}>
              <span className={styles.color}>수정 후</span>
              <span>
                00동아리 부장으로 활동하며, 회의록 작성 및 문서 관리 과정에서 팀원 간 소통의 어려움을 인식했습니다.
                <br />
                <span className={styles.size}>
                  000를 활용한 <span className={styles.color}>실시간 협업 시스템 도입</span>과, 핵심 내용 요약 및
                  불필요한 부분 정리를 통해
                  <br />
                  회의록 작성의 <span className={styles.color}>효율성을 약 20% 이상 개선</span>하였습니다.
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        ref={bottomRef}
        initial={{ opacity: 0, y: 100 }}
        animate={bottomInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className={styles.bottom}
      >
        <div className={styles.wrapper}>
          <div className={styles.sampleReport}>
            <span className={styles.title}>
              예시 레포트를 통해 <br />
              결과를 자세히 보고 싶다면?
            </span>
            <div className={styles.sampleReportButton}>예시 레포트 보러 가기</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Landing;
