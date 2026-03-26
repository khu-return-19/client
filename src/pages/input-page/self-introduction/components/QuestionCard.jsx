import { useState, useEffect, useRef } from "react";

const SHADOW = "0 0 33.6px rgba(116, 154, 220, 0.3)";

function QuestionCard({ onContentChange, showPlus, showMinus, onAdd, onRemove, isAddDisabled, question: initialQuestion = "", content: initialContent = "" }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [content, setContent] = useState(initialContent);
  const plusBtnRef = useRef(null);

  useEffect(() => {
    if (!isAddDisabled) return;
    const btn = plusBtnRef.current;
    if (btn) {
      btn.style.boxShadow = "none";
      btn.style.outline = "none";
      btn.blur();
    }
  }, [isAddDisabled]);

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
    onContentChange?.(e.target.value, content);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    onContentChange?.(question, e.target.value);
  };

  const applyHover = (e) => {
    e.currentTarget.style.boxShadow = SHADOW;
  };

  const clearHover = (e) => {
    e.currentTarget.style.boxShadow = "none";
    e.currentTarget.style.outline = "none";
    e.currentTarget.blur();
  };

  const applyActive = (e) => {
    e.currentTarget.style.outline = "2px solid #09469F";
    e.currentTarget.style.outlineOffset = "-1px";
    e.currentTarget.style.boxShadow = SHADOW;
  };

  const clearActive = (e) => {
    e.currentTarget.style.outline = "none";
  };

  return (
    <div className="relative w-full">
      <div className="w-full md:w-[calc(100%-60px)] border border-[#717171] rounded-[6px] p-[12px]">
        <input
          type="text"
          placeholder="질문 문항을 입력해주세요"
          value={question}
          onChange={handleQuestionChange}
          className="w-full h-[62px] bg-[#F5F5F5] px-[12px] rounded-[4px] text-[18px] font-normal leading-[120%] text-black placeholder-[#717171] outline-none"
        />
        <div className="my-[12px] border-b border-[#B5B5B5]" />
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          onChange={handleContentChange}
          className="w-full h-[160px] md:h-[256px] bg-[#F5F5F5] rounded-[4px] px-[12px] py-[12px] text-[16px] font-normal leading-[150%] text-black placeholder-[#717171] outline-none resize-none"
        />
        <div className="w-full mt-[12px] flex items-center justify-between">
          <div className="block md:hidden">
            {showMinus && (
              <button
                className="text-[14px] font-normal text-[#717171] underline cursor-pointer"
                onClick={() => onRemove?.()}
              >
                삭제
              </button>
            )}
          </div>
          <span className="text-[14px] font-normal leading-[120%] text-[#717171] ml-auto">
            {content.length} 자
          </span>
        </div>
      </div>

      <div className="hidden md:flex flex-col absolute top-0 right-0 gap-[10px]">
        {showMinus && (
          <button
            className="w-[50px] h-[50px] rounded-[4px] border border-[#717171] flex items-center justify-center cursor-pointer transition-colors group hover:border-[#09469F]"
            onMouseEnter={applyHover}
            onMouseLeave={clearHover}
            onMouseDown={applyActive}
            onMouseUp={clearActive}
            onClick={() => onRemove?.()}
          >
            <div
              className="w-[32px] bg-[#717171] group-hover:bg-[#09469F] transition-colors"
              style={{ height: "1.5px" }}
            />
          </button>
        )}
        {showPlus && (
          <button
            ref={plusBtnRef}
            disabled={isAddDisabled}
            className={`w-[50px] h-[50px] rounded-[4px] flex items-center justify-center transition-colors
              ${isAddDisabled
                ? "border border-[#717171] opacity-40 cursor-not-allowed"
                : "border border-[#717171] cursor-pointer group hover:border-[#09469F]"
              }`}
            onMouseEnter={e => { if (!isAddDisabled) applyHover(e); }}
            onMouseLeave={e => { if (!isAddDisabled) clearHover(e); }}
            onMouseDown={e => { if (!isAddDisabled) applyActive(e); }}
            onMouseUp={e => { if (!isAddDisabled) clearActive(e); }}
            onClick={() => onAdd?.()}
          >
            <div className="relative w-[32px] h-[32px]">
              <div
                className={`absolute top-1/2 left-0 w-full -translate-y-1/2 bg-[#717171] transition-colors ${!isAddDisabled ? "group-hover:bg-[#09469F]" : ""}`}
                style={{ height: "1.5px" }}
              />
              <div
                className={`absolute left-1/2 top-0 h-full -translate-x-1/2 bg-[#717171] transition-colors ${!isAddDisabled ? "group-hover:bg-[#09469F]" : ""}`}
                style={{ width: "1.5px" }}
              />
            </div>
          </button>
        )}
      </div>

      {/* 모바일 */}
      {showPlus && (
        <div className="flex md:hidden justify-end mt-[8px] px-[4px]">
          <button
            ref={plusBtnRef}
            disabled={isAddDisabled}
            className={`w-[32px] h-[32px] rounded-[4px] border flex items-center justify-center transition-colors
              ${isAddDisabled
                ? "border-[#717171] opacity-40 cursor-not-allowed"
                : "border-[#717171] cursor-pointer"
              }`}
            onClick={() => onAdd?.()}
          >
            <div className="relative w-[18px] h-[18px]">
              <div
                className="absolute top-1/2 left-0 w-full -translate-y-1/2 bg-[#717171]"
                style={{ height: "1.5px" }}
              />
              <div
                className="absolute left-1/2 top-0 h-full -translate-x-1/2 bg-[#717171]"
                style={{ width: "1.5px" }}
              />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default QuestionCard;
