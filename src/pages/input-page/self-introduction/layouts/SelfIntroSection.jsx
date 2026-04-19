import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import Button from "../../components/Button";
import AnalysisButton from "../../components/AnalysisButton";
import AnalysisModal from "../components/AnalysisModal";
import TempSaveModal from "../../components/TempSaveModal";
import api from "api/axiosInstance";

// API
import { useCreateAnalysis } from "hooks/useCreateAnalysis";
import { useAnalysisStore } from "stores/analysisStore";

const MAX_CARDS = 5;
const SESSION_KEY = "selfIntroCards";

const defaultCards = () => [{ id: 0, question: "", content: "" }];

function loadFromSession() {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : defaultCards();
  } catch {
    return defaultCards();
  }
}

function SelfIntroSection() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(loadFromSession);
  const [showModal] = useState(false);
  const [showTempSaveModal, setShowTempSaveModal] = useState(false);
  const [credit, setCredit] = useState(0);

  const { start } = useCreateAnalysis();
  const status = useAnalysisStore((state) => state.status);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    if (status === "running") {
      navigate("/input-page/loading");
    }
  }, [status, navigate]);

  // credit 가져오기 - 마운트될 때마다 실행
  useEffect(() => {
    const getCredit = async () => {
      try {
        const userId = sessionStorage.getItem("verifiedEmail") || "";
        const response = await api.get(
          `/api/auth/email/credit?email=${userId}`,
          { headers: { "X-API-Version": "2" } }
        );
        setCredit(response.data?.credit || 0);
      } catch (error) {
        console.error("Failed to fetch credit:", error);
        setCredit(3);
      }
    };

    getCredit();
  }, []);

  const firstFilled =
    cards[0]?.question.trim().length > 0 && cards[0]?.content.trim().length > 0;

  const handleAdd = () => {
    if (cards.length >= MAX_CARDS) return;
    setCards((prev) => [
      ...prev,
      { id: Date.now(), question: "", content: "" },
    ]);
  };

  const handleRemove = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleCardChange = (id, question, content) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, question, content } : card,
      ),
    );
  };

  const resumeEducation = JSON.parse(
    sessionStorage.getItem("resume_education") || "[]",
  );
  const analysisData = {
    userId: sessionStorage.getItem("verifiedEmail") || "",
    questionList: cards.map((card) => card.question),
    answerList: cards.map((card) => card.content),
    education: resumeEducation[0]?.university + "졸업",
    gpa: resumeEducation[0]?.gpa || null,
    major: resumeEducation[0]?.major || "",
    backgroundCareerAward: JSON.parse(
      sessionStorage.getItem("resume_awards") || "[]",
    )
      .map((data) => data.name)
      .join(","),

    certificates: JSON.parse(
      sessionStorage.getItem("resume_certificates") || "[]",
    )
      .map((data) => data.type)
      .join(","),
    linguisticAbility: JSON.parse(
      sessionStorage.getItem("resume_languages") || "[]",
    )
      .map((data) => data.type)
      .join(","),
    company: sessionStorage.getItem("company_companyName") || "",
    jobPosition: sessionStorage.getItem("company_jobTitle") || "",
    jobField: sessionStorage.getItem("company_jobTitle") || "",
    url: sessionStorage.getItem("company_noticeUrl") || "",
    division: "",
    applyUrl: sessionStorage.getItem("company_noticeUrl") || "",
  };

  const handleAnalysis = async () => {
    if (!firstFilled) return;

    try {
      await start(analysisData);
      // setShowModal(true); // 성공 시 모달 표시
    } catch (error) {
      console.error("Analysis creation failed:", error);
      // 에러 처리 (토스트 메시지 등 추가 가능)
    }
  };

  return (
    <div className="w-full max-w-[1080px] mx-auto mt-[24px] md:mt-[72px] pb-[200px]">
      <p className="text-[12px] font-normal leading-[150%] text-[#717171] mb-[24px]">
        질문과 답변을 한 개 이상 입력해주세요.
      </p>
      <div className="flex flex-col gap-[60px]">
        {cards.map((card, index) => (
          <QuestionCard
            key={card.id}
            question={card.question}
            content={card.content}
            showPlus={index === cards.length - 1}
            showMinus={cards.length > 1}
            onAdd={handleAdd}
            onRemove={() => handleRemove(card.id)}
            isAddDisabled={cards.length >= MAX_CARDS}
            onContentChange={(q, c) => handleCardChange(card.id, q, c)}
          />
        ))}
      </div>

      <div className="mt-[40px] md:mt-[110px]">
        {/* 데스크탑/태블릿 */}
        <div className="hidden md:flex flex-col items-center gap-[12px]">
          <Button
            size="M"
            variant="secondary"
            className="!h-[52px]"
            onClick={() => setShowTempSaveModal(true)}
          >
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled && credit < 3 ? "default" : "disabled"}
            onClick={handleAnalysis}
            email={analysisData.userId}
          />
        </div>
        {/* 모바일 */}
        <div className="flex md:hidden justify-center gap-[12px]">
          <Button
            size="M"
            variant="secondary"
            className="!h-[48px] !w-[140px]"
            onClick={() => setShowTempSaveModal(true)}
          >
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled && credit < 3 ? "default" : "disabled"}
            onClick={handleAnalysis}
            email={analysisData.userId}
            className="!w-[160px] !h-[48px]"
          />
        </div>
      </div>

      {showModal && <AnalysisModal onClose={() => {}} />}
      {showTempSaveModal && (
        <TempSaveModal onClose={() => setShowTempSaveModal(false)} />
      )}
    </div>
  );
}

export default SelfIntroSection;
