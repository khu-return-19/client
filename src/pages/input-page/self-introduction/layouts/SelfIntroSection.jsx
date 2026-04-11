import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "../../components/Button";
import AnalysisButton from "../../components/AnalysisButton";
import AnalysisModal from "../components/AnalysisModal";
import TempSaveModal from "../../components/TempSaveModal";

// API
import { useCreateAnalysis } from "api/analysisApi";

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
  const [cards, setCards] = useState(loadFromSession);
  const [showModal] = useState(false);
  const [showTempSaveModal, setShowTempSaveModal] = useState(false);

  const { mutateAsync: createAnalysis } = useCreateAnalysis();

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(cards));
  }, [cards]);

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

  const handleAnalysis = async () => {
    if (!firstFilled) return;
    const analysisData = {
      email: "",
      company: "지원 회사명",
      position: "지원 직무명",
      input: cards
        .map(
          (card, index) =>
            `Q${index + 1}: ${card.question}\nA${index + 1}: ${card.content}`,
        )
        .join("\n\n"), // 질문과 답변을 텍스트로 합침
      resume: {
        major: "전공",
        universityName: "대학교 졸업",
        gpa: 3.5,
        career: "수상실적",
        languageScore: "어학점수",
        certificate: "자격증",
      },
      url: "지원 링크",
      accessCode: 123456,
    };

    try {
      await createAnalysis(analysisData);
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
          <Button size="M" variant="secondary" className="!h-[52px]" onClick={() => setShowTempSaveModal(true)}>
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled ? "default" : "disabled"}
            onClick={handleAnalysis}
          />
        </div>
        {/* 모바일 */}
        <div className="flex md:hidden justify-center gap-[12px]">
          <Button size="M" variant="secondary" className="!h-[48px] !w-[140px]" onClick={() => setShowTempSaveModal(true)}>
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled ? "default" : "disabled"}
            onClick={handleAnalysis}
            className="!w-[160px] !h-[48px]"
          />
        </div>
      </div>

      {showModal && <AnalysisModal onClose={() => {}} />}
      {showTempSaveModal && <TempSaveModal onClose={() => setShowTempSaveModal(false)} />}
    </div>
  );
}

export default SelfIntroSection;
