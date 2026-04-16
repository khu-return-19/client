import warningIcon from "assets/icons/warning.svg";
import closeIcon from "assets/icons/x.svg";

/**
 * @param {string}   title      - 모달 제목
 * @param {string}   message    - 서버에서 온 에러 메시지
 * @param {string}   [hint]     - 강조 안내 문구 (schemer_failed 등)
 * @param {function} onClose    - X 버튼 / 바깥 클릭 시 닫기
 * @param {function} onConfirm  - 확인 버튼 클릭 시 동작 (없으면 onClose 사용)
 */
function AnalysisErrorModal({ title, message, hint, onClose, onConfirm }) {
  const handleConfirm = onConfirm ?? onClose;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] bg-white rounded-[10px] flex flex-col mx-[24px] shadow-[0_0_10px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pt-[20px] pr-[20px]">
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-[16px] px-[32px] pb-[32px]">
          <img src={warningIcon} alt="warning" className="w-[40px] h-[40px]" />
          <div className="flex flex-col items-center gap-[8px]">
            <p className="text-[20px] font-medium leading-[120%] text-black text-center">
              {title}
            </p>
            {message && (
              <p className="text-[15px] font-normal leading-[160%] text-[#717171] text-center whitespace-pre-wrap">
                {message}
              </p>
            )}
          </div>
          {hint && (
            <p className="text-[15px] font-semibold leading-[150%] text-[#2876F1] text-center">
              {hint}
            </p>
          )}
        </div>

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
