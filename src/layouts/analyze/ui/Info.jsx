import React from "react";
import styles from "./Info.module.scss";

function Info() {
  return (
    <div className={styles.info}>
      <div className={styles.title}>
        <span className={styles.titleText}>3D 역량분석</span>
        <div className={styles.subTitle}>
          <span className={styles.subTitleText}>
            자기소개서 분석을 통해 원하는 기업에 합격하기 위해 필요한 역량을 알아볼 수 있습니다.
          </span>
        </div>
      </div>
      <div className={styles.notice}>
        <img src="/shared/info.png" alt="" className={styles.infoImage} />
        <div>
          <span className={styles.highlight}>이용 방법 안내</span> <br />
          <span>지원하고자 하는 기업과 직무를 입력하고, 자기소개서와 이력서를 등록해 보세요.</span> <br />
          <span>AI가 내용을 분석하여 부족한 부분과 개선 방향을 안내해 드립니다.</span> <br />
          <br />
          <span className={styles.highlight}>이용시 주의 사항</span> <br />
          <span>1. 하루 3회만 분석이 가능합니다. 매일 자정 이용가능 횟수가 초기화됩니다.</span> <br />
          <span>2. 빈 문항을 반복적으로 입력할 경우, 서비스 이용 횟수가 차감될 수 있습니다.</span>
          <br />
          <span>
            3. 합격 확률 및 3D 점수화 같은 수치는 예년 합격자들과의 상대적인 차이로 산출된 점수힙니다.
            <span className={styles.highlight}>(시간에 따라 수치가 다르게 나타날 수 있습니다.)</span>
          </span>
          <br />
          <span>4. AI는 실수할 수 있습니다.</span> <br />
          <span>5. 기타 발생한 버그는 bqudmals@khu.ac.kr로 제보 부탁드립니다.</span> <br />
        </div>
      </div>
    </div>
  );
}

export default Info;
