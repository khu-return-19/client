import { useState } from "react";
import warningIcon from "assets/icons/warning.svg";
import closeIcon from "assets/icons/x.svg";

/**
 * @param {string}   title      - 모달 제목
 * @param {string}   message    - 주요 안내 메시지
 * @param {string}   [detail]   - 토글로 펼치는 구체적 사유 (schemer_failed)
 * @param {string}   [hint]     - 강조 안내 문구 (파란색 bold)
 * @param {function} onClose    - X 버튼 / 바깥 클릭
 * @param {function} onConfirm  - 확인 버튼 (없으면 onClose 사용)
 */
function AnalysisErrorModal({ title, message, detail, hint, onClose, onConfirm }) {
  const handleConfirm = onConfirm ?? onClose;
  const [detailOpen, setDetailOpen] = useState(false);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] bg-white rounded-[10px] flex flex-col mx-[24px] shadow-[0_0_10px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <div className="flex justify-end pt-[20px] pr-[20px]">
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex flex-col items-center gap-[16px] px-[32px] pb-[32px]">
          <img src={warningIcon} alt="warning" className="w-[40px] h-[40px]" />

          <div className="flex flex-col items-center gap-[8px] w-full">
            <p className="text-[20px] font-medium leading-[120%] text-black text-center">
              {title}
            </p>
            {message && (
              <p className="text-[15px] font-normal leading-[160%] text-[#717171] text-center whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>

          {/* 사유 토글 — detail이 있을 때만 렌더링 */}
          {detail && (
            <div className="w-full">
              <button
                onClick={() => setDetailOpen((prev) => !prev)}
                className="flex items-center gap-[4px] text-[13px] font-normal text-[#aaaaaa] hover:text-[#717171] transition-colors cursor-pointer mx-auto"
              >
                <span>{detailOpen ? "사유 닫기" : "사유 보기"}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`transition-transform duration-200 ${detailOpen ? "rotate-180" : ""}`}
                >
                  <path
                    d="M2 4L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {detailOpen && (
                <div className="mt-[8px] px-[16px] py-[12px] bg-[#f8f8f8] rounded-[6px] w-full">
                  <p className="text-[13px] font-normal leading-[160%] text-[#888888] whitespace-pre-wrap break-keep">
                    {detail}
                  </p>
                </div>
              )}
            </div>
          )}

          {hint && (
            <p className="text-[15px] font-semibold leading-[150%] text-[#2876F1] text-center">
              {hint}
            </p>
          )}
        </div>

        {/* 확인 버튼 */}
        <div className="flex justify-center pb-[48px]">
          <button
            onClick={handleConfirm}
            className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default AnalysisErrorModal;
