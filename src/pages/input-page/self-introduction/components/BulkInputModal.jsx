import { useState } from "react";

function BulkInputModal({ onClose, onConfirm, isLoading }) {
  const [content, setContent] = useState("");

  const handleConfirm = () => {
    onConfirm?.(content);
    // onClose는 호출하지 않음 — 파싱 성공 시 SelfIntroSection에서 닫음
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.12)" }}
      onClick={(e) => { if (e.target === e.currentTarget && !isLoading) onClose?.(); }}
    >
     <div
  className="relative w-full md:w-[80%] bg-white rounded-[12px] border border-[#E0E0E0] px-[28px] pt-[28px] pb-[24px] flex flex-col mx-4 md:mx-0 h-[70vh] md:h-[80vh]"
  style={{ maxWidth: "1080px" }}
>
        <button
          className="absolute top-[16px] right-[16px] text-[#717171] hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={onClose}
          disabled={isLoading}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        <h2 className="text-[20px] font-medium text-black mb-[6px]">일괄 입력하기</h2>
        <p className="text-[16px] text-black mb-[20px]">
          전체 내용을 한 번에 작성·붙여넣기하여 입력할 수 있습니다.
          <span className="text-[13px] text-[#B5B5B5] ml-[8px]">*문항이 많을 경우 분리되는 데 시간이 걸릴 수 있습니다.</span>
        </p>

        <div className="border border-[#717171] rounded-[6px] p-[12px] flex flex-col flex-1 min-h-0">
          <textarea
            placeholder="[Q. 질문, A. 답변] 형식으로 내용을 작성해주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full flex-1 min-h-0 bg-[#F5F5F5] rounded-[4px] px-[12px] py-[12px] text-[16px] font-normal leading-[150%] text-black placeholder-[#717171] outline-none resize-none"
          />
          <div className="mt-[12px] flex justify-end">
            <span className="text-[14px] text-[#717171]">{content.length} 자</span>
          </div>
        </div>

        <div className="mt-[20px] flex justify-center">
          <button
            disabled={content.trim().length === 0 || isLoading}
            className={`w-[140px] h-[44px] rounded-[4px] text-[15px] transition-all duration-200 flex items-center justify-center gap-[8px]
              ${content.trim().length === 0 || isLoading
                ? "border border-[#B5B5B5] text-[#B5B5B5] cursor-default"
                : "border border-[#09469F] text-[#0D326F] hover:bg-[#ECF1F8] cursor-pointer"
              }`}
            onClick={handleConfirm}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-[16px] w-[16px]"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                처리 중...
              </>
            ) : (
              "확인"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default BulkInputModal;