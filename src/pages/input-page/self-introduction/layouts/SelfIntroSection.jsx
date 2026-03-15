import { useState } from "react";
import QuestionCard from "../components/QuestionCard";
import Button from "../../components/Button";
import AnalysisButton from "../../components/AnalysisButton";

const MAX_CARDS = 5;

function SelfIntroSection() {
  const [cards, setCards] = useState([{ id: 0 }]);
  const [firstFilled, setFirstFilled] = useState(false);

  const handleAdd = () => {
    if (cards.length >= MAX_CARDS) return;
    setCards((prev) => [...prev, { id: Date.now() }]);
  };

  const handleRemove = (id) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <div className="w-full max-w-[1080px] mx-auto mt-[clamp(45px,5vw,72px)] pb-[clamp(124px,13.89vw,200px)]">
      <div className="flex flex-col gap-[clamp(37px,4.17vw,60px)]">
        {cards.map((card, index) => (
          <QuestionCard
            key={card.id}
            showPlus={index === 0}
            showMinus={index !== 0}
            onAdd={handleAdd}
            onRemove={() => handleRemove(card.id)}
            isAddDisabled={cards.length >= MAX_CARDS}
            onContentChange={index === 0 ? (q, c) => setFirstFilled(q.trim().length > 0 && c.trim().length > 0) : undefined}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-[12px] mt-[120px]">
        <div className="flex gap-[12px]">
          <Button size="M" variant="secondary" className="!h-[52px]">
            임시저장
          </Button>
        </div>
        <AnalysisButton status={firstFilled ? "default" : "disabled"} />
      </div>
    </div>
  );
}

export default SelfIntroSection;
