import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uncheckedIcon from "assets/icons/Rectangle 219.png";
import checkedIcon from "assets/icons/Component 33.png";
import arrowIcon from "assets/icons/Frame 228.png";
import Button from "../../components/Button";

const AGREEMENT_ITEMS = [
  { id: "terms", type: "필수", label: "이용약관에 동의합니다." },
  { id: "privacy", type: "필수", label: "개인정보처리 수집 및 이용에 동의합니다." },
  { id: "policy", type: "필수", label: "개인정보처리방침에 동의합니다." },
  { id: "thirdParty", type: "선택", label: "개인정보 제3자 제공에 동의합니다." },
];

const REQUIRED_IDS = ["terms", "privacy", "policy"];

function Agreement({ isEmailVerified = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({
    terms: false,
    privacy: false,
    policy: false,
    thirdParty: false,
  });
  const [hasInteracted, setHasInteracted] = useState(false);

  const allChecked = Object.values(checked).every(Boolean);
  const allRequiredChecked = REQUIRED_IDS.every((id) => checked[id]);
  const canStart = isEmailVerified && allRequiredChecked;
  const showError = hasInteracted && !allRequiredChecked;

  const handleAllToggle = () => {
    setHasInteracted(true);
    const newValue = !allChecked;
    setChecked({
      terms: newValue,
      privacy: newValue,
      policy: newValue,
      thirdParty: newValue,
    });
  };

  const handleToggle = (id) => {
    setHasInteracted(true);
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStart = () => {
    if (!canStart) return;
    navigate("/input-page/company");
  };

  return (
    <div className="w-[600px]">
      <h2 className="text-[24px] font-medium leading-[120%] text-black text-center">
        약관 동의
      </h2>

      <div className="w-[600px] h-[200px] mt-[40px]">
        <div
          className="w-[600px] pb-[12px] flex items-center border-b border-[#858585] cursor-pointer"
          onClick={handleAllToggle}
        >
          <div className="flex items-center gap-[20px]">
            <img
              src={allChecked ? checkedIcon : uncheckedIcon}
              alt="checkbox"
              className="w-[24px] h-[24px]"
            />
            <span className="text-[16px] font-normal leading-[150%] text-black">
              전체 동의
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] mt-[20px]">
          {AGREEMENT_ITEMS.map((item) => (
            <div key={item.id} className="w-[592px] flex items-center justify-between">
              <div
                className="flex items-center gap-[20px] cursor-pointer"
                onClick={() => handleToggle(item.id)}
              >
                <img
                  src={checked[item.id] ? checkedIcon : uncheckedIcon}
                  alt="checkbox"
                  className="w-[24px] h-[24px]"
                />
                <span className={`text-[16px] font-normal leading-[150%] ${item.type === "선택" ? "text-[#717171]" : "text-black"}`}>
                  {item.type}
                </span>
                <span className="text-[16px] font-normal leading-[150%] text-black">
                  {item.label}
                </span>
              </div>
              <img
                src={arrowIcon}
                alt="detail"
                className="w-[24px] h-[24px] cursor-pointer"
                onClick={() => {
                  // 약관 모달 정해지면 나오게 예정
                }}
              />
            </div>
          ))}
        </div>

        {showError && (
          <p className="text-[16px] font-normal leading-[150%] text-[#A40F16] mt-[12px]">
            필수 약관에 동의해주세요.
          </p>
        )}
      </div>

      <div className="mt-[120px]">
        <Button
          size="L"
          status={canStart ? "default" : "disabled"}
          onClick={handleStart}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

export default Agreement;
