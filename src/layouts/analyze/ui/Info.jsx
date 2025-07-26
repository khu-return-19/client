import React from "react";
import styles from "./Info.module.scss";

function Info() {
  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <span className={styles.titleText}>Pertineo 3D 역량 분석</span>
        <div className={styles.subTitle}>
          <span className={styles.subTitleText}>
            Pertineo에게 희망 기업과 직무 그리고 본인의 역량을 나타낼수 있는 정보를 제공하여, 커리어 컨설팅 보고서를
            생성 할 수 있습니다
          </span>
        </div>
      </div>
      <div className={styles.notice}>
        <img src="/shared/info.png" alt="" className={styles.infoImage} />
        <div>
          <span className={styles.highlight}>이용 방법 안내</span> <br />
          <span>지원하고자 하는 기업과 직무를 입력하고, 자기소개서와 이력서를 입력합니다.</span>
          <br />
          <span>
            Pertineo가 기존 합격자 데이터, Web Search, 3차원(3D) 척도를 기반으로 분석하여 보고서를 생성합니다.
          </span>
          <br />
          <span>생성된 보고서는 경희대학교 웹메일로 전송됩니다.</span>
          <br />
          <br />
          <span className={styles.highlight}>이용시 주의 사항</span> <br />
          <span>1. 경희대학교 웹 메일 당 3회의 분석이 가능합니다. 매일 자정 이용 가능 횟수가 초기화됩니다.</span> <br />
          <span>
            2. 정상적이지 않은 입력(빈 입력, 부족한 분량의 자기소개서)를 분석 요청을 자동으로 반려하며, 반복적인 반려시
            분석 이용 횟수가 차감될 수 있으니 유의하시길 바랍니다.
          </span>
          <br />
          <span>
            3. 보고서의 정량적 수치는 합격자, 실시간 웹 서치 결과 등을 고려한 수치로 시간에 따라 변동될 수 있습니다.
          </span>
          <br />
          <span>4. 인공지능은 실수 할 수 있습니다. 중요한 정보는 재차 확인하시길 바랍니다.</span> <br />
        </div>
      </div>
    </div>
  );
}

export default Info;
