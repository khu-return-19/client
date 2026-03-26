import { useState, useEffect } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "../../components/Button";
import AnalysisButton from "../../components/AnalysisButton";
import AnalysisModal from "../components/AnalysisModal";

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
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(cards));
  }, [cards]);

  const firstFilled = cards[0]?.question.trim().length > 0 && cards[0]?.content.trim().length > 0;

  const handleAdd = () => {
    if (cards.length >= MAX_CARDS) return;
    setCards((prev) => [...prev, { id: Date.now(), question: "", content: "" }]);
  };

  const handleRemove = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleCardChange = (id, question, content) => {
    setCards((prev) => prev.map((card) => card.id === id ? { ...card, question, content } : card));
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
          <Button size="M" variant="secondary" className="!h-[52px]">
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled ? "default" : "disabled"}
            onClick={() => { if (firstFilled) setShowModal(true); }}
          />
        </div>
        {/* 모바일 */}
        <div className="flex md:hidden justify-center gap-[12px]">
          <Button size="M" variant="secondary" className="!h-[48px] !w-[140px]">
            임시저장
          </Button>
          <AnalysisButton
            status={firstFilled ? "default" : "disabled"}
            onClick={() => { if (firstFilled) setShowModal(true); }}
            className="!w-[160px] !h-[48px]"
          />
        </div>
      </div>

      {showModal && <AnalysisModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default SelfIntroSection;
