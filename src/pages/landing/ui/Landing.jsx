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
      </div>
    </div>
  );
}

export default Landing;
