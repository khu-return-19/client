import modalCheckIcon from "assets/icons/modal_check.svg";
import closeIcon from "assets/icons/x.svg";

function TempSaveModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[600px] h-[320px] bg-white rounded-[10px] flex flex-col mx-[24px] shadow-[0_0_10px_rgba(0,0,0,0.12)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end pt-[20px] pr-[20px]">
          <button onClick={onClose} className="cursor-pointer">
            <img src={closeIcon} alt="close" className="w-[24px] h-[24px]" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 gap-[32px] pb-[32px]">
          <img src={modalCheckIcon} alt="check" className="w-[40px] h-[40px]" />
          <div className="flex flex-col items-center gap-[8px]">
            <p className="text-[20px] font-medium leading-[120%] text-black text-center">
              임시저장이 완료되었습니다.
            </p>
          </div>
        </div>

        <div className="flex justify-center pb-[48px]">
          <button
            onClick={onClose}
            className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors cursor-pointer"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default TempSaveModal;
