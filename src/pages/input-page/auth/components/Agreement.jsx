import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Checkbox from "./Checkbox";
import TermsModal from "./TermsModal";

const AGREEMENT_ITEMS = [
  { id: "terms",      type: "필수", label: "이용약관에 동의합니다.",              modalTitle: "Pertineo 이용약관",         url: "/terms/이용약관.html" },
  { id: "privacy",    type: "필수", label: "개인정보처리 수집 및 이용에 동의합니다.", modalTitle: "Pertineo 개인정보 처리 및 수집 및 이용 동의서", url: "/terms/개인정보수집이용.html" },
  { id: "policy",     type: "필수", label: "개인정보처리방침에 동의합니다.",          modalTitle: "Pertineo 개인정보 처리방침",                  url: "/terms/개인정보처리방침.html" },
  { id: "thirdParty", type: "선택", label: "개인정보 제3자 제공에 동의합니다.",       modalTitle: "Pertineo 개인정보 제3자 제공 동의서",          url: "/terms/개인정보제3자제공.html" },
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
  const [openModal, setOpenModal] = useState(null); // 열린 약관 item

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
        <div className="w-[600px] pb-[12px] flex items-center border-b border-[#858585]">
          <div className="flex items-center gap-[20px]">
            <Checkbox checked={allChecked} onChange={handleAllToggle} />
            <span
              className="text-[16px] font-normal leading-[150%] text-black cursor-pointer"
              onClick={handleAllToggle}
            >
              전체 동의
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-[16px] mt-[20px]">
          {AGREEMENT_ITEMS.map((item) => (
            <div key={item.id} className="w-[592px] flex items-center justify-between">
              <div className="flex items-center gap-[20px] cursor-pointer" onClick={() => handleToggle(item.id)}>
                <Checkbox checked={checked[item.id]} onChange={() => handleToggle(item.id)} />
                <span className={`text-[16px] font-normal leading-[150%] ${item.type === "선택" ? "text-[#717171]" : "text-black"}`}>
                  {item.type}
                </span>
                <span className="text-[16px] font-normal leading-[150%] text-black">
                  {item.label}
                </span>
              </div>
              <div
                className="w-[24px] h-[24px] flex items-center justify-center cursor-pointer group"
                onClick={() => setOpenModal(item)}
              >
                <svg width="9" height="16" viewBox="0 0 9 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.59082 7.53027L1.06055 15.0605L0 14L6.46973 7.53027L0 1.06055L1.06055 0L8.59082 7.53027Z"
                    className="fill-[#B5B5B5] group-hover:fill-[#717171] transition-colors"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {showError && (
          <p className="text-[16px] font-normal leading-[150%] text-[#A40F16] mt-[12px]">
            필수 약관에 동의해주세요.
          </p>
        )}
      </div>

      {openModal && (
        <TermsModal
          title={openModal.modalTitle}
          url={openModal.url}
          onClose={() => setOpenModal(null)}
        />
      )}

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
