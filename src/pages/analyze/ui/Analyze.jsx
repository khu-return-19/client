import React, { useState, useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useFetchResume } from "api/resumeApi";
import { useCreateAnalysis } from "api/analysisApi";
import { useNavigate } from "react-router-dom";
import { AnalysisConfirmModal, AnalyzeSkeleton } from "layouts/analyze";
import { useAuth } from "auth/authContext";
import { toast } from "react-toastify";

function Analyze() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);

  const [universityNameLength, setUniversityNameLength] = useState(0);
  const [majorLength, setMajorLength] = useState(0);
  const [gpaLength, setGpaLength] = useState(0);
  const [careerLength, setCareerLength] = useState(0);
  const [languageScoreLength, setLanguageScoreLength] = useState(0);
  const [certificateLength, setCertificateLength] = useState(0);
  const [companyLength, setCompanyLength] = useState(0);
  const [positionLength, setPositionLength] = useState(0);
  const [urlLength, setUrlLength] = useState(0);
  const [inputLength, setInputLength] = useState(0);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: resumeData, isLoading } = useFetchResume();
  const createAnalysis = useCreateAnalysis();
  const { userInfo } = useAuth();

  const navigate = useNavigate();

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
          case "company":
            setCompanyLength(value.length);
            break;
          case "position":
            setPositionLength(value.length);
            break;
          case "url":
            setUrlLength(value.length);
            break;
          case "input":
            setInputLength(value.length);
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
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!formData) return;

    const requestBody = {
      company: formData.company,
      position: formData.position,
      input: formData.input,
      url: formData.url,
      resume: {
        major: formData.major,
        universityName: formData.universityName,
        gpa: parseFloat(formData.gpa) || 0.0,
        career: formData.career,
        languageScore: formData.languageScore,
        certificate: formData.certificate,
      },
    };

    createAnalysis.mutate(requestBody, {
      onSuccess: (response) => {
        if (response) {
          const toastId = toast.loading("분석 요청 중...");

          setTimeout(() => {
            toast.update(toastId, {
              render: "분석 요청 완료! 잠시 후 이동합니다.",
              type: "success",
              isLoading: false,
              autoClose: 1300,
              closeOnClick: true,
            });

            setTimeout(() => {
              navigate("/analysis", { replace: true });
              window.location.reload();
            }, 1500);
          }, 1000);
        }
      },
      onError: (error) => {
        console.error("분석 실패:", error);
        toast.error("분석 요청 중 오류가 발생했습니다.");
      },
    });

    setIsModalOpen(false);
  };

  if (isLoading) return <AnalyzeSkeleton />;

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.titleText}>3D 역량분석</span>
            <div className={styles.subTitle}>
              <span className={styles.subTitleText}>
                자기소개서 분석을 통해 원하는 기업에 합격하기 위해 필요한 역량을 알아볼 수 있습니다.
              </span>
              <span className={styles.count}>오늘 남은 이용 횟수 : {userInfo.count}/3</span>
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
              <span>5. 기타 발생한 버그는 abcdfg@khu.ac.kr로 제보 부탁드립니다.</span> <br />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.resume}>
            <span className={styles.title}>내 이력서</span>
            <div className={styles.resumeContent}>
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
                    className={`${errors.gpa ? styles.errorInput : ""}`}
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
                  placeholder="예시) 정보처리기사, 컴퓨터활용능력 1급"
                />
                <div className={styles.charCount}>{certificateLength}/100</div>
              </div>
            </div>
          </div>

          <div className={styles.introduction}>
            <div>
              <div className={styles.companyAndJob}>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>지원 회사명</span>
                  <input
                    maxLength={100}
                    {...register("company", {
                      onChange: (e) => {
                        setCompanyLength(e.target.value.length);
                      },
                    })}
                    placeholder="예시) 삼성전자"
                  />
                  <div className={styles.charCount}>{companyLength}/100</div>
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>지원 직무</span>
                  <input
                    maxLength={100}
                    {...register("position", {
                      onChange: (e) => {
                        setPositionLength(e.target.value.length);
                      },
                    })}
                    placeholder="예시) 네트워크 사업부 sw 개발"
                  />
                  <div className={styles.charCount}>{positionLength}/100</div>
                </div>
              </div>
              <div className={styles.urlInputGroup}>
                <span className={styles.inputLabel}>지원 공고 사이트 url</span>
                <input
                  maxLength={100}
                  {...register("url", {
                    onChange: (e) => {
                      setUrlLength(e.target.value.length);
                    },
                  })}
                />
                <div className={styles.charCount}>{urlLength}/100</div>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <span className={styles.introductionTitle}>자기소개서</span>
              <div className={styles.introductionContentWrapper}>
                <textarea
                  className={styles.introductionContent}
                  maxLength={10000}
                  {...register("input", {
                    onChange: (e) => {
                      setInputLength(e.target.value.length);
                    },
                  })}
                  placeholder={`자기소개서의 질문 문항과 대답 문항을 같이 작성해주세요.
                \n\n예시)\n1. 삼성전자를 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오. 700자 (영문작성 시 1400자) 이내\n\n삼성전자의 네트워크 사업부에서 차세대 네트워크 기술 개발에 기여하며, 글로벌 시장에서 경쟁력 있는 소프트웨어 솔루션을 제공하고 싶습니다...`}
                />
                <div className={styles.charCount}>{inputLength}/10000</div>
              </div>
            </div>
          </div>

          <div className={styles.save}>
            <span className={styles.text}>위 자기소개서를 기반으로 분석을 진행합니다.</span>
            <button type="submit" className={styles.saveButton}>
              AI 분석 시작하기
            </button>
          </div>
        </form>
      </div>
      <AnalysisConfirmModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirm} />
    </div>
  );
}

export default Analyze;
