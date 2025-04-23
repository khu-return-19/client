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
      });
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
  // return <AnalyzeSkeleton />;

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.title}>
            <span className={styles.titleText}>3D 역량분석</span>
            <div className={styles.subTitle}>
              <span className={styles.subTitleText}>자소서 내용을 입력해주시면 AI 첨삭을 받을 수 있습니다.</span>
              <span className={styles.count}>오늘 남은 이용 횟수 : {userInfo.count}/3</span>
            </div>
          </div>
          <div className={styles.notice}>
            <img src="/shared/info.png" alt="" className={styles.infoImage} />
            <div>
              <span className={styles.highlight}>이용 방법 안내</span> <br />
              <span>분석할 나의 자기소개서를 붙여넣습니다.</span> <br />
              <br />
              <span className={styles.highlight}>이용시 주의 사항</span> <br />
              <span>
                1. AI 데이터 사용량 조절을 위해 하루 3회만 분석이 가능합니다. 매일 자정 이용기능 횟수가 초기화됩니다.
              </span>
              <br />
              <span>
                2. 합격확률 및 3D 점수와 같은 수치는 예년 합격자들과의 상대적인 차이로 산출된 점수힙니다.
                <span className={styles.highlight}>(시간에 따라 수치가 다르게 나타날 수 있습니다.)</span>
              </span>
              <br />
              <span>3. AI는 실수할 수 있습니다.</span> <br />
              <span>4. 기타 발생한 버그는 abcdfg@khu.ac.kr로 제보 부탁드립니다.</span> <br />
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
                  <input {...register("universityName")} />
                </div>
                <div className={styles.inputGroup}>
                  <span className={styles.inputLabel}>
                    학점 <span className={styles.hint}>(4.5 기준)</span>
                  </span>
                  <div>
                    <input
                      {...register("gpa", {
                        pattern: {
                          value: /^(?:\d+|\d*\.\d+)$/, // 숫자 또는 숫자.숫자 형태만 허용
                          message: "숫자만 입력해야 합니다.",
                        },
                      })}
                      className={`${errors.gpa ? styles.errorInput : ""}`}
                    />
                    {errors.gpa && <span className={styles.errorText}>{errors.gpa.message}</span>}
                  </div>
                </div>
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>전공</span>
                <input {...register("major")} />
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>경력 및 수상 실적</span>
                <input {...register("career")} />
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>어학 성적</span>
                <input {...register("languageScore")} />
              </div>

              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>자격증</span>
                <input {...register("certificate")} />
              </div>
            </div>
          </div>

          <div className={styles.introduction}>
            <div className={styles.inputGroup}>
              <span className={styles.introductionTitle}>자기소개서</span>
              <textarea className={styles.introductionContent} {...register("input")} />
            </div>
            <div className={styles.companyAndJob}>
              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>지원회사명</span>
                <input {...register("company")} />
              </div>
              <div className={styles.inputGroup}>
                <span className={styles.inputLabel}>지원 직무</span>
                <input {...register("position")} />
              </div>
            </div>
            <div className={styles.urlInputGroup}>
              <span className={styles.inputLabel}>지원 공고 사이트 url</span>
              <input {...register("url")} />
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
