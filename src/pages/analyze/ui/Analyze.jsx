import React, { useEffect } from "react";
import styles from "./Analyze.module.scss";
import { useForm } from "react-hook-form";
import { useFetchResume } from "api/resumeApi";
import { useCreateAnalysis } from "api/analysisApi";
import { useNavigate } from "react-router-dom";

function Analyze() {
  const { register, handleSubmit, setValue } = useForm();
  const { data: resumeData, isLoading } = useFetchResume();

  const createAnalysis = useCreateAnalysis();
  const navigate = useNavigate();

  useEffect(() => {
    if (resumeData) {
      Object.entries(resumeData).forEach(([key, value]) => {
        setValue(key, value ?? "");
      });
    }
  }, [resumeData]);

  const onSubmit = (data) => {
    const requestBody = {
      company: data.company,
      position: data.position,
      input: data.input,
      resume: {
        major: data.major,
        universityName: data.universityName,
        gpa: parseFloat(data.gpa) || 0.0,
        career: data.career,
        languageScore: data.languageScore,
        certificate: data.certificate,
      },
    };

    createAnalysis.mutate(requestBody, {
      onSuccess: (response) => {
        console.log("분석 성공:", response);
        // TODO: 성공 시 결과 화면으로 이동 or 결과 표시
        if (response) {
          navigate(`/analysis/${response}`); // id 값이 있으면 해당 페이지로 이동
        }
      },
      onError: (error) => {
        console.error("분석 실패:", error);
        // TODO: 실패 시 사용자에게 알림
      },
    });
  };

  return (
    <div className={styles.analyze}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <div className={styles.title}>
            <div>3D 역량분석</div>
            <div className={styles.subTitle}>
              <div>자소서 내용을 입력해주시면 AI 첨삭을 받을 수 있습니다.</div>
              <div>오늘 남은 이용 횟수 : 1/3 2025/02/11 00:00:00</div>
            </div>
          </div>
          <div className={styles.notice}>
            <img src="/infoImage.png" alt="" className={styles.infoImage} />
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
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.resume}>
            <div>내 이력서</div>
            <div className={styles.resumeContent}>
              <div className={styles.school}>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabel}>학교 이름</div>
                  <input {...register("universityName")} />
                </div>
                <div className={styles.inputGroup}>
                  <div className={styles.inputLabel}>학점</div>
                  <input {...register("gpa")} />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>전공</div>
                <input {...register("major")} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>경력 및 수상 실적</div>
                <input {...register("career")} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>어학 성적</div>
                <input {...register("languageScore")} />
              </div>

              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>자격증</div>
                <input {...register("certificate")} />
              </div>
            </div>
          </div>
          <div className={styles.introduction}>
            <div className={styles.inputGroup}>
              <div className={styles.inputLabel}>자기소개서</div>
              <textarea {...register("input")} />
            </div>
            <div className={styles.companyAndJob}>
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>지원회사명</div>
                <input {...register("company")} />
              </div>
              <div className={styles.inputGroup}>
                <div className={styles.inputLabel}>지원 직무</div>
                <input {...register("position")} />
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

export default Analyze;
