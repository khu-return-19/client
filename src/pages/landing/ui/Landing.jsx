import React, { useState } from "react";
import styles from "./Landing.module.scss";
import { SampleReport } from "components/landing";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { Evaluation, Improvement, ResumeFeedback } from "layouts/landing";

function Landing() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
                <span className={styles.subTitle}>1분 컷 무료 AI 3D역량평가 & 분석</span>
                <span className={styles.text}>
                  합격자 빅데이터 기반의 3D역량평가를 통해 <br />
                  <strong>직무역량분석</strong>과 <strong>개선된 자기소개서</strong>를 확인하세요
                </span>
              </div>
              <img src="/landing/main.png" alt="" className={styles.mainImage} />
              <div className={styles.imageButtonGroup}>
                <button className={`${styles.imageButton} `} />
              </div>
              <div className={styles.analyzeButton} onClick={() => setIsModalOpen(true)}>
                예시 레포트 보러가기
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
                <span className={styles.subTitle}>1분 컷 무료 AI 3D역량평가 & 분석</span>
                <span className={styles.text}>
                  합격자 빅데이터 기반의 3D역량평가를 통해 <br />
                  <strong>직무역량분석</strong>과 <strong>개선된 자기소개서</strong>를 확인하세요
                </span>
              </div>
              <div className={styles.imageButtonGroup}>
                <button className={`${styles.imageButton} `} />
              </div>
              <div className={styles.analyzeButton} onClick={() => setIsModalOpen(true)}>
                예시 레포트 보러가기
              </div>
            </div>
            <div className={styles.rightSection}>
              <img src="/landing/main.png" alt="" className={styles.mainImage} />
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
          <Evaluation />
        </motion.div>

        <motion.div
          ref={impRef}
          initial={{ opacity: 0, y: 100 }}
          animate={impInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.improvement}
        >
          <Improvement />
        </motion.div>

        <motion.div
          ref={feedRef}
          initial={{ opacity: 0, y: 100 }}
          animate={feedInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={styles.resumeFeedback}
        >
          <ResumeFeedback />
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
              지금 바로 (Here & Now) <br />
              당신의 자기소개서를 평가받고 수정하고 싶다면?
            </span>
            <div
              className={styles.sampleReportButton}
              onClick={() => {
                navigate("/analyze");
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
            >
              자기소개서 평가 및 첨삭 받기
            </div>
          </div>
        </div>
      </motion.div>
      {isModalOpen && <SampleReport onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Landing;
