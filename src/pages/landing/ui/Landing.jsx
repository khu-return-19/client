import React, { useEffect, useState } from "react";
import styles from "./Landing.module.scss";

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
      <div className={styles.container}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>AI 기반 자기소개서 분석</h1>
          <p className={styles.description}>
            인공지능을 활용해 당신의 자기소개서를 분석하고,
            <br />
            개선점을 제시하여 더 나은 자기소개서를 만드세요.
          </p>
          <button className={styles.ctaButton} onClick={handleAuth}>
            지금 시작하기
          </button>
        </div>
        <div className={styles.imageSection}>
          <img className={styles.image} src="https://via.placeholder.com/400x300" alt="AI 분석 이미지" />
        </div>
      </div>
      <div className={styles.scrollSection}>
        <div className={`${styles.scrollContent} ${isVisible ? styles.show : ""}`}>
          <div className={styles.scrollText}>
            <h2>서비스 특징</h2>
            <p>
              인공지능을 통해 자기소개서를 분석하여,
              <br />더 나은 방향으로 개선할 수 있는 유용한 피드백을 제공합니다.
            </p>
          </div>
          <div className={styles.scrollText}>
            <h2>간편한 사용법</h2>
            <p>
              몇 단계만으로 쉽게 자기소개서를 업로드하고,
              <br />
              AI 분석 결과를 즉시 확인할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
