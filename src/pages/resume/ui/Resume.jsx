import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./Resume.module.scss";
import { useFetchResume, useUpdateResume } from "api/resumeApi";
import { ResumeSkeleton } from "layouts/resume";

function Resume() {
  const [universityNameLength, setUniversityNameLength] = useState(0);
  const [majorLength, setMajorLength] = useState(0);
  const [gpaLength, setGpaLength] = useState(0);
  const [careerLength, setCareerLength] = useState(0);
  const [languageScoreLength, setLanguageScoreLength] = useState(0);
  const [certificateLength, setCertificateLength] = useState(0);

  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: resumeData, isLoading } = useFetchResume();
  const { mutate: updateResume } = useUpdateResume();

  useEffect(() => {
    if (resumeData) {
      Object.entries(resumeData).forEach(([key, value]) => {
        setValue(key, value ?? "");

        switch (key) {
          case "career":
            setCareerLength(value.length);
            break;
          case "languageScore":
            setLanguageScoreLength(value.length);
            break;
          case "certificate":
            setCertificateLength(value.length);
            break;
          case "universityName":
            setUniversityNameLength(value.length);
            break;
          case "major":
            setMajorLength(value.length);
            break;
          case "gpa":
            setGpaLength(value?.toString().length ?? 0);
            break;
          default:
            break;
        }
      });

      setTimeout(() => {
        const textareas = document.querySelectorAll("textarea");
        textareas.forEach((textarea) => {
          textarea.style.height = "3.5rem";
          textarea.style.height = textarea.scrollHeight + "px";
        });
      }, 0);
    }
  }, [resumeData]);

  const onSubmit = (data) => {
    if (isEditing) {
      updateResume(data);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (isLoading) return <ResumeSkeleton />;

  return (
    <div className={styles.resume}>
      <div className={styles.wrapper}>
        <div className={styles.myResume}>
          <span className={styles.title}>내 이력서</span>
          <div className={styles.info}>
            <img src="/shared/info.png" alt="" className={styles.infoImage} />
            <div className={styles.infoText}>
              <span>입력 안내사항</span>
              <ul>
                <li>구체적인 경험과 성과를 담아 작성해 주세요.</li>
                <li className={styles.noDot}>
                  (예: "팀 프로젝트 참여" 대신 "5인 팀 리더로 프로젝트 수행, 매출 20% 증가")
                </li>
                <li>
                  이력서에 민감한 개인정보
                  <span>(주민등록번호, 계좌번호 등)</span>는 입력하지 마세요.
                </li>
                <li>하나의 입력란 안에 해당되는 내용은 한 번에 작성해주세요.</li>
                <li className={styles.noDot}>
                  (예: 복수 전공 시 - 국어국문학과, 경제학과 / 어학성적 - 토익 745점, 오픽 IH, 아이엘츠...)
                </li>
              </ul>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.school}>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>학교 이름</span>
              <input
                maxLength={100}
                {...register("universityName", {
                  onChange: (e) => {
                    setUniversityNameLength(e.target.value.length);
                  },
                })}
                disabled={!isEditing}
                className={isEditing ? styles.activeInput : styles.inactiveInput}
              />
              <div className={styles.charCount}>{universityNameLength}/100</div>
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.inputLabel}>
                학점 <span className={styles.hint}>(4.5 기준)</span>
              </span>
              <input
                maxLength={100}
                {...register("gpa", {
                  pattern: {
                    value: /^(?:\d+|\d*\.\d+)$/, // 숫자 또는 숫자.숫자 형태만 허용
                    message: "숫자만 입력해야 합니다.",
                  },
                  onChange: (e) => {
                    setGpaLength(e.target.value.length);
                  },
                })}
                disabled={!isEditing}
                className={`${isEditing ? styles.activeInput : styles.inactiveInput} ${
                  errors.gpa ? styles.errorInput : ""
                }`}
              />
              <div className={styles.charCountContainer}>
                {errors.gpa && <span className={styles.errorText}>{errors.gpa.message}</span>}
                <span className={styles.charCount}>{gpaLength}/100</span>
              </div>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>전공</span>
            <input
              maxLength={100}
              {...register("major", {
                onChange: (e) => {
                  setMajorLength(e.target.value.length);
                },
              })}
              disabled={!isEditing}
              className={isEditing ? styles.activeInput : styles.inactiveInput}
            />
            <div className={styles.charCount}>{majorLength}/100</div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>경력 및 수상 실적</span>
            <textarea
              maxLength={100}
              {...register("career", {
                onChange: (e) => {
                  setCareerLength(e.target.value.length);
                  const textarea = e.target;
                  textarea.style.height = "3.5rem";
                  textarea.style.height = textarea.scrollHeight + "px";
                },
              })}
              disabled={!isEditing}
              className={isEditing ? styles.activeInput : styles.inactiveInput}
              placeholder="예시) 2023.01 ~ 2023.02: 삼성전자 인턴십, 2022.03 ~ 2022.12: LG디스플레이 연구개발팀"
            />
            <div className={styles.charCount}>{careerLength}/100</div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>어학 성적</span>
            <textarea
              maxLength={100}
              {...register("languageScore", {
                onChange: (e) => {
                  setLanguageScoreLength(e.target.value.length);
                  const textarea = e.target;
                  textarea.style.height = "3.5rem";
                  textarea.style.height = textarea.scrollHeight + "px";
                },
              })}
              disabled={!isEditing}
              className={isEditing ? styles.activeInput : styles.inactiveInput}
              placeholder="예시) 토익 900점, 오픽 IH"
            />
            <div className={styles.charCount}>{languageScoreLength}/100</div>
          </div>

          <div className={styles.inputGroup}>
            <span className={styles.inputLabel}>자격증</span>
            <textarea
              maxLength={100}
              {...register("certificate", {
                onChange: (e) => {
                  setCertificateLength(e.target.value.length);
                  const textarea = e.target;
                  textarea.style.height = "3.5rem";
                  textarea.style.height = textarea.scrollHeight + "px";
                },
              })}
              disabled={!isEditing}
              className={isEditing ? styles.activeInput : styles.inactiveInput}
              placeholder="예시) 정보처리기사, 컴퓨터활용능력 1급"
            />
            <div className={styles.charCount}>{certificateLength}/100</div>
          </div>

          <div className={styles.save}>
            <span className={isEditing ? styles.description : styles.noDescription}>
              위 이력서를 기반으로 분석을 진행합니다.
            </span>
            {isEditing ? (
              <button type="submit" className={styles.saveButton}>
                저장
              </button>
            ) : (
              <div className={styles.saveButton} onClick={handleEditClick}>
                수정
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resume;
