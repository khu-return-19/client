import Button from "../../components/Button";

function EmailVerification() {
  return (
    <div className="w-[600px]">
      <h2 className="text-[24px] font-medium leading-[120%] text-black text-center">
        이메일 인증
      </h2>

      <div className="w-[600px] mt-[40px]">
        <div className="flex items-center gap-[9px]">
          <span className="text-[20px] font-medium leading-[150%] text-black">
            이메일
          </span>
          <span className="text-[20px] font-medium leading-[150%] text-[#2876F1]">
            *
          </span>
          <span className="text-[16px] font-normal leading-[150%] text-[#717171]">
            경희대학교 메일만 가능합니다.
          </span>
        </div>

        <div className="flex items-center gap-[16px] mt-[12px]">
          <input
            type="email"
            placeholder="  이메일 입력"
            className="w-[384px] h-[52px] border-b border-[#858585] text-[16px] font-normal text-silver placeholder-silver outline-none bg-transparent"
          />
          <Button size="s2" status="disabled">
            인증번호 전송
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EmailVerification;
