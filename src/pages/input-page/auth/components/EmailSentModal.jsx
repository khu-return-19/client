import completeIcon from "assets/icons/완료.svg";

function EmailSentModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative bg-white rounded-[10px] overflow-hidden w-[min(450px,calc(100vw-40px))] h-[200px] flex flex-col items-center justify-center shadow-lg">
        <img src={completeIcon} alt="완료" className="w-[40px] h-[40px] mb-[16px]" />
        <p className="text-[16px] font-medium text-black">인증번호가 이메일로 전송되었습니다.</p>

        {/* 하단 바 */}
        <div className="absolute bottom-0 left-0 w-full h-[6px] bg-[#ECF1F8]">
          <div className="h-full bg-[#2876F1] animate-progress" onAnimationEnd={onClose} />
        </div>
      </div>
    </div>
  );
}

export default EmailSentModal;
