import React from "react";
import styles from "./Team.module.scss";
import { useNavigate } from "react-router-dom";
import GoToMainButton from "components/shared/goToMainButton";

function Team() {
  const navigate = useNavigate();

  return (
    <div className={styles.team}>
      <div className={styles.breadcrumb}>
        <span>서비스 소개</span>
        <div>></div>
        <span>3D 역량분석이란?</span>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.title}>서비스 제작 구성원 소개</div>
        <div className={styles.subtitle}>자기소개서 분석</div>
        <img src="/team.png" alt="team" className={styles.teamImage} />
        <div className={styles.subtitle}>웹서비스 구축</div>
        <div className={styles.content}>
          <div className={styles.card}>
            <div>이미지</div>
            <div className={styles.description}>
              <span className={styles.name}>곽병민</span>
              <span className={styles.info}>
                컴퓨터공학과 <br />
                Front-end <br />
                bqudmals@khu.ac.kr
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>이미지</div>
            <div className={styles.description}>
              <span className={styles.name}>김원진</span>
              <span className={styles.info}>
                컴퓨터공학과 <br />
                AI <br />
                wjkim9653@khu.ac.kr
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>이미지</div>
            <div className={styles.description}>
              <span className={styles.name}>홍승표</span>
              <span className={styles.info}>
                컴퓨터공학과 <br />
                Back-end <br />
                zackinthebox@khu.ac.kr
              </span>
            </div>
          </div>
          <div className={styles.card}>
            <div>이미지</div>
            <div className={styles.description}>
              <span className={styles.name}>김효림</span>
              <span className={styles.info}>
                디지털콘텐츠학과 <br />
                Design <br />
                kimyohada226@gmail.com
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          <div className={styles.title}>다른 글 더보기</div>
          <div className={styles.button}>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/intro");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>서비스 소개</span>
              <span className={styles.description}>자기소개서 역량평가 AI에 대한 전반적인 소개글과 활용 방안</span>
            </div>
            <div
              className={styles.card}
              onClick={() => {
                navigate("/evaluation");
                window.scrollTo(0, 0);
              }}
            >
              <span className={styles.title}>3D 역량분석이란?</span>
              <span className={styles.description}>자기소개서 평가 모델의 세부적인 이론과 배경에 대한 설명</span>
            </div>
          </div>
        </div>
        <GoToMainButton />
      </div>
    </div>
  );
}

export default Team;
