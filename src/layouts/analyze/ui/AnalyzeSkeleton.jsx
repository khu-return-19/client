import React from "react";
import styles from "./AnalyzeSkeleton.module.scss";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function AnalyzeSkeleton() {
  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.title}>
            <div className={styles.titleText}>3D 역량분석</div>
            <div className={styles.subTitle}>
              <div>자소서 내용을 입력해주시면 AI 첨삭을 받을 수 있습니다.</div>
              <Skeleton width={150} height={20} />
            </div>
          </div>
          <div className={styles.notice}>
            <img src="/shared-info.png" alt="" className={styles.infoImage} />
            <div>
              <div>이용 방법 안내</div>
              <span>분석할 나의 자기소개서를 붙여넣습니다.</span>
              <br />
              <br />
              <span>이용시 주의 사항</span> <br />
              <span>
                1. AI 데이터 사용량 조절을 위해 하루 3회만 분석이 가능합니다. 매일 자정 이용기능 횟수가 초기화됩니다.
              </span>
              <br />
              <span>
                2. 합격확률 및 3D 점수와 같은 수치는 예년 합격자들과의 상대적인 차이로 산출된 점수힙니다. (시간에 따라
                수치가 다르게 나타날 수 있습니다.)
              </span>
              <br />
              <span>3. AI는 실수할 수 있습니다.</span> <br />
              <span>4. 기타 발생한 버그는 abcdfg@khu.ac.kr로 제보 부탁드립니다.</span> <br />
            </div>
          </div>
        </div>
        <form className={styles.form}>
          <div className={styles.resume}>
            <div>내 이력서</div>
            <div className={styles.resumeContent}>
              <div className={styles.school}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabel}>학교 이름</div>
                  <Skeleton height={56} />
                </div>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabel}>학점</div>
                  <Skeleton height={56} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>전공</div>
                <Skeleton height={56} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>경력 및 수상 실적</div>
                <Skeleton height={56} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>어학 성적</div>
                <Skeleton height={56} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>자격증</div>
                <Skeleton height={56} />
              </div>
            </div>
          </div>

          <div className={styles.introduction}>
            <div className={styles.inputGroup}>
              <div className={styles.introductionTitle}>자기소개서</div>
              <Skeleton height={216} />
            </div>
            <div className={styles.companyAndJob}>
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>지원회사명</div>
                <Skeleton height={56} />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>지원 직무</div>
                <Skeleton height={56} />
              </div>
            </div>
          </div>

          <div className={styles.save}>
            <div>위 자기소개서를 기반으로 분석을 진행합니다.</div>
            <button type="submit" className={styles.saveButton}>
              AI 분석 시작하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AnalyzeSkeleton;
