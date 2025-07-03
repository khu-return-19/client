import React from "react";
import styles from "./ResumeSection.module.scss";

function ResumeSection({ register, errors, lengths, setLengths }) {
  const handleAutoResize = (e, key) => {
    setLengths((prev) => ({ ...prev, [key]: e.target.value.length }));
    e.target.style.height = "3.5rem";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  return (
    <div className={styles.resume}>
      <span className={styles.title}>내 이력서</span>
      <div className={styles.resumeContent}>
        <div className={styles.school}>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>학교 이름</span>
            <input
              placeholder="예시) 경희대학교"
              maxLength={100}
              {...register("universityName", {
                onChange: (e) => setLengths((prev) => ({ ...prev, universityName: e.target.value.length })),
              })}
            />
            <div className={styles.charCount}>{lengths.universityName}/100</div>
          </div>
          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>
              학점 <span className={styles.hint}>(4.5 기준)</span>
            </span>
            <input
              placeholder="예시) 4.1"
              maxLength={100}
              {...register("gpa", {
                pattern: {
                  value: /^(?:\d+|\d*\.\d+)$/,
                  message: "숫자만 입력해야 합니다.",
                },
                onChange: (e) => setLengths((prev) => ({ ...prev, gpa: e.target.value.length })),
              })}
              className={`${errors.gpa ? styles.errorInput : ""}`}
            />
            <div className={styles.charCountContainer}>
              {errors.gpa && <span className={styles.errorText}>{errors.gpa.message}</span>}
              <span className={styles.charCount}>{lengths.gpa}/100</span>
            </div>
          </div>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>전공</span>
          <input
            placeholder="예시) 컴퓨터공학과"
            maxLength={100}
            {...register("major", {
              onChange: (e) => setLengths((prev) => ({ ...prev, major: e.target.value.length })),
            })}
          />
          <div className={styles.charCount}>{lengths.major}/100</div>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>경력 및 수상 실적</span>
          <textarea
            maxLength={100}
            {...register("career", {
              onChange: (e) => handleAutoResize(e, "career"),
            })}
            placeholder="예시) 2023.01 ~ 2023.02: 삼성전자 인턴십, ..."
          />
          <div className={styles.charCount}>{lengths.career}/100</div>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>어학 성적</span>
          <textarea
            maxLength={100}
            {...register("languageScore", {
              onChange: (e) => handleAutoResize(e, "languageScore"),
            })}
            placeholder="예시) 토익 900점, 오픽 IH"
          />
          <div className={styles.charCount}>{lengths.languageScore}/100</div>
        </div>

        <div className={styles.inputGroup}>
          <span className={styles.inputLabel}>자격증</span>
          <textarea
            maxLength={100}
            {...register("certificate", {
              onChange: (e) => handleAutoResize(e, "certificate"),
            })}
            placeholder="예시) 정보처리기사, 컴퓨터활용능력 1급"
          />
          <div className={styles.charCount}>{lengths.certificate}/100</div>
        </div>
      </div>
    </div>
  );
}

export default ResumeSection;
