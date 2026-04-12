import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EntryGroupSection from "../components/EntryGroupSection";
import Button from "../../components/Button";
import TempSaveModal from "../../components/TempSaveModal";
import {
  useFetchUniversities,
  useFetchMajors,
  useFetchCompanies,
  useFetchPositions,
} from "api/setupApi";

// 어학 종류 리스트
const LANGUAGES_MASTER = [
  "TOEIC",
  "TEPS",
  "G-TELP",
  "TOSEL",
  "OPIc",
  "TOEIC Speaking",
  "TEPS Speaking",
  "G-TELP Speaking",
  "TOEFL",
  "IELTS",
  "PTE Academic",
  "Duolingo English Test",
  "GRE",
  "GMAT",
  "FCE",
  "CAE",
  "CPE",
  "HSK",
  "HSKK",
  "BCT",
  "TSC",
  "CPT",
  "TOCFL",
  "JLPT",
  "JPT",
  "SJPT",
  "BJT",
  "Goethe-Zertifikat",
  "TestDaF",
  "DSH",
  "DELF",
  "DALF",
  "TCF",
  "TEF",
  "DELE",
  "FLEX",
  "TORFL",
  "SNULT",
  "OPI",
  "VPT",
  "TOPIK",
  "KBS한국어능력시험",
  "ToKL",
  "CELI",
  "CILS",
  "Celpe-Bras",
  "ITT",
  "TCT",
];

function ResumeSection() {
  const navigate = useNavigate();
  const [showTempSaveModal, setShowTempSaveModal] = useState(false);

  // API 자동완성 데이터
  const { data: universitiesData } = useFetchUniversities();
  const { data: majorsData } = useFetchMajors();
  const { data: companiesData } = useFetchCompanies();
  const { data: positionsData } = useFetchPositions();

  const universitiesList = useMemo(
    () => universitiesData?.data?.list ?? [],
    [universitiesData],
  );
  const majorsList = useMemo(() => majorsData?.data?.list ?? [], [majorsData]);
  const companiesList = useMemo(
    () => companiesData?.data?.list ?? [],
    [companiesData],
  );
  const positionsList = useMemo(
    () => positionsData?.data?.list ?? [],
    [positionsData],
  );

  const loadSession = (key, defaultVal) => {
    try {
      const saved = sessionStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultVal;
    } catch {
      return defaultVal;
    }
  };

  // 1. 상태 정의
  const [education, setEducation] = useState(() =>
    loadSession("resume_education", [
      { university: "경희대학교", major: "", gpa: "", minor: "" },
    ]),
  );
  const [experience, setExperience] = useState(() =>
    loadSession("resume_experience", [
      { type: "", period: "", company: "", department: "", position: "" },
    ]),
  );
  const [awards, setAwards] = useState(() =>
    loadSession("resume_awards", [{ name: "", issuer: "" }]),
  );
  const [certifications, setCertifications] = useState(() =>
    loadSession("resume_certifications", [{ type: "", date: "" }]),
  );
  const [languages, setLanguages] = useState(() =>
    loadSession("resume_languages", [{ type: "", score: "" }]),
  );

  // 세션스토리지 저장
  useEffect(() => {
    sessionStorage.setItem("resume_education", JSON.stringify(education));
  }, [education]);
  useEffect(() => {
    sessionStorage.setItem("resume_experience", JSON.stringify(experience));
  }, [experience]);
  useEffect(() => {
    sessionStorage.setItem("resume_awards", JSON.stringify(awards));
  }, [awards]);
  useEffect(() => {
    sessionStorage.setItem(
      "resume_certifications",
      JSON.stringify(certifications),
    );
  }, [certifications]);
  useEffect(() => {
    sessionStorage.setItem("resume_languages", JSON.stringify(languages));
  }, [languages]);

  // 2. 자동완성용 결과 상태
  const [autocompleteResults, setAutocompleteResults] = useState({
    university: [],
    major: [],
    minor: [],
    company: [],
    position: [],
    langType: [],
  });

  // 3. 필터링 로직
  const filterResults = (value, list) => {
    if (!value) return [];
    return list.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );
  };

  // 행 변경 핸들러 (자동완성 트리거용)
  const handleEduChange = (newItems) => {
    setEducation(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults((prev) => ({
      ...prev,
      university: filterResults(last.university, universitiesList),
      major: filterResults(last.major, majorsList),
      minor: filterResults(last.minor, majorsList),
    }));
  };

  const handleExpChange = (newItems) => {
    setExperience(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults((prev) => ({
      ...prev,
      company: filterResults(last.company, companiesList),
      position: filterResults(last.position, positionsList),
    }));
  };

  const handleLangChange = (newItems) => {
    setLanguages(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults((prev) => ({
      ...prev,
      langType: filterResults(last.type, LANGUAGES_MASTER),
    }));
  };

  return (
    <div className="overflow-y-auto flex flex-col items-center min-[894px]:gap-[100px] max-[893px]:gap-[40px] min-[894px]:mt-[38px] max-[893px]:mt-[34px] mb-[150px]">
      {showTempSaveModal && (
        <TempSaveModal onClose={() => setShowTempSaveModal(false)} />
      )}
      {/* 학력사항 */}
      <EntryGroupSection
        caption="학력사항"
        items={education}
        onChange={handleEduChange}
        required={true}
        newItem={{ university: "경희대학교", major: "", gpa: "", minor: "" }}
        placeholders={{
          university: "대학교명",
          major: "전공",
          gpa: "학점 (4.3기준)",
          minor: "부전공",
        }}
        autocompleteResults={{
          university: autocompleteResults.university,
          major: autocompleteResults.major,
          minor: autocompleteResults.minor,
        }}
      />

      {/* 경력사항 */}
      <EntryGroupSection
        caption="경력사항"
        items={experience}
        onChange={handleExpChange}
        placeholders={{
          type: "고용 형태",
          period: "기간",
          company: "회사명",
          department: "부서명",
          position: "직책",
        }}
        autocompleteResults={{
          company: autocompleteResults.company,
          position: autocompleteResults.position,
        }}
      />

      {/* 수상실적 */}
      <EntryGroupSection
        caption="수상실적"
        items={awards}
        onChange={setAwards}
        placeholders={{
          name: "수상 이름",
          issuer: "발급처",
        }}
      />

      {/* 자격사항 */}
      <EntryGroupSection
        caption="자격사항"
        items={certifications}
        onChange={setCertifications}
        placeholders={{
          type: "자격 종류",
          date: "발급일",
        }}
      />

      {/* 어학사항 */}
      <EntryGroupSection
        caption="어학사항"
        items={languages}
        onChange={handleLangChange}
        placeholders={{
          type: "어학 종류",
          score: "등급/점수",
        }}
        autocompleteResults={{
          type: autocompleteResults.langType,
        }}
      />

      {/* 다음 단계 버튼 */}
      <div className="min-[894px]:mt-[20px] max-[893px]:mt-[30px] flex gap-[12px] items-center">
        <Button variant="secondary" onClick={() => setShowTempSaveModal(true)}>
          임시저장
        </Button>
        <Button onClick={() => navigate("/input-page/self-introduction")}>
          다음
        </Button>
      </div>
    </div>
  );
}

export default ResumeSection;
