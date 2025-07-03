import React from "react";
import styles from "./IntroductionSection.module.scss";

function IntroductionSection({ register, errors, lengths, setLengths }) {
  return (
    <div className={styles.introduction}>
      <div>
        <div className={styles.companyAndJob}>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>지원 회사명</span>
            <input
              maxLength={100}
              {...register("company", {
                required: "지원 회사명을 입력해주세요.",
                onChange: (e) => setLengths((prev) => ({ ...prev, company: e.target.value.length })),
              })}
              placeholder="예시) 삼성전자"
            />
            <div className={styles.infoRow}>
              {errors.company && <div className={styles.errorText}>{errors.company.message}</div>}
              <div className={styles.charCount}>{lengths.company}/100</div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>지원 직무</span>
            <input
              maxLength={100}
              {...register("position", {
                required: "지원 직무를 입력해주세요.",
                onChange: (e) => setLengths((prev) => ({ ...prev, position: e.target.value.length })),
              })}
              placeholder="예시) 네트워크 사업부 sw 개발"
            />
            <div className={styles.infoRow}>
              {errors.position && <div className={styles.errorText}>{errors.position.message}</div>}
              <div className={styles.charCount}>{lengths.position}/100</div>
            </div>
          </div>
        </div>
        <div className={styles.urlInputGroup}>
          <span className={styles.inputLabel}>지원 공고 사이트 url</span>
          <input
            maxLength={100}
            {...register("url", {
              onChange: (e) => setLengths((prev) => ({ ...prev, url: e.target.value.length })),
            })}
          />
          <div className={styles.charCount}>{lengths.url}/100</div>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <span className={styles.introductionTitle}>자기소개서</span>
        <div className={styles.introductionContentWrapper}>
          <textarea
            className={styles.introductionContent}
            maxLength={10000}
            {...register("input", {
              required: "자기소개서를 입력해주세요.",
              onChange: (e) => setLengths((prev) => ({ ...prev, input: e.target.value.length })),
            })}
            placeholder={`자기소개서의 질문 문항과 대답 문항을 같이 작성해주세요.
                \n\n예시)\n1. 삼성전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. 700자 (영문작성 시 1400자) 이내\n\n삼성전자의 네트워크 사업부에서 차세대 네트워크 기술 개발에 기여하며, 글로벌 시장에서 경쟁력 있는 소프트웨어 솔루션을 제공하고 싶습니다...`}
          />
          <div className={styles.infoRow}>
            {errors.input && <div className={styles.errorText}>{errors.input.message}</div>}
            <div className={styles.charCount}>{lengths.input}/10000</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroductionSection;
