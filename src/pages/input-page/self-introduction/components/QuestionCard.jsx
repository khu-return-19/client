import { useState } from "react";

function QuestionCard() {
  const [question, setQuestion] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="w-[1020px] border border-[#717171] rounded-[6px] p-[12px]">
      <input
        type="text"
        placeholder="질문 문항을 입력해주세요"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full h-[62px] bg-[#F5F5F5] px-[12px] rounded-[4px] text-[18px] font-normal leading-[120%] text-black placeholder-[#717171] outline-none"
      />
      <div className="my-[12px] border-b border-[#858585]" />
      <textarea
        placeholder="내용을 입력해주세요"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-[256px] bg-[#F5F5F5] rounded-[4px] px-[12px] py-[12px] text-[16px] font-normal leading-[150%] text-black placeholder-[#717171] outline-none resize-none"
      />
      <div className="w-[996px] h-[17px] mt-[12px] flex justify-end">
        <span className="text-[14px] font-normal leading-[120%] text-[#717171]">
          {content.length} 자
        </span>
      </div>
    </div>
  );
}

export default QuestionCard;
