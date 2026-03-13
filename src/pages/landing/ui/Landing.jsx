import React, { useState } from "react";
import styles from "./Landing.module.scss";
import { SampleReport } from "components/landing";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useMediaQuery } from "react-responsive";
import { Evaluation, Improvement, ResumeFeedback, Bottom, IntroSmallSize, IntroBigSize } from "layouts/landing";

function Landing() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [evalRef, evalInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [impRef, impInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [feedRef, feedInView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [bottomRef, bottomInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });
  const isTablet = useMediaQuery({ query: "(min-width: 768px) and (max-width: 1023px)" });

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className={styles.landing}>
      <div className={styles.wrapper}>
        {isMobile || isTablet ? <IntroSmallSize onOpenModal={openModal} /> : <IntroBigSize onOpenModal={openModal} />}

        <div className={styles.videoContainer}>
          <video src="/landing/resume-writing.mp4" autoPlay loop muted playsInline />
          <video src="/landing/report-generation.mp4" autoPlay loop muted playsInline />
        </div>

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
        <Bottom />
      </motion.div>
      {isModalOpen && <SampleReport onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default Landing;
