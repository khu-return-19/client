import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Checkbox from "./Checkbox";
import TermsModal from "./TermsModal";
import { useStartSession, SESSION_STORAGE_KEY } from "api/sessionApi";
import { clearClientAuthState } from "api/authRecovery";

const AGREEMENT_ITEMS = [
  {
    id: "terms",
    type: "필수",
    label: "이용약관에 동의합니다.",
    modalTitle: "Pertineo 이용약관",
    url: "https://d2qlxukzyb0szn.cloudfront.net/terms-of-service/v1/terms-of-service.html",
  },
  {
    id: "privacy",
    type: "필수",
    label: "개인정보처리 수집 및 이용에 동의합니다.",
    modalTitle: "Pertineo 개인정보 처리 및 수집 및 이용 동의서",
    url: "https://d2qlxukzyb0szn.cloudfront.net/terms-of-service/v1/privacy-collection-and-use.html",
  },
  {
    id: "policy",
    type: "필수",
    label: "개인정보처리방침에 동의합니다.",
    modalTitle: "Pertineo 개인정보 처리방침",
    url: "https://d2qlxukzyb0szn.cloudfront.net/terms-of-service/v1/privacy-policy.html",
  },
  {
    id: "thirdParty",
    type: "필수",
    label: "개인정보 제3자 제공에 동의합니다.",
    modalTitle: "Pertineo 개인정보 제3자 제공 동의서",
    url: "https://d2qlxukzyb0szn.cloudfront.net/terms-of-service/v1/third-party-data-sharing.html",
  },
];

const REQUIRED_IDS = ["terms", "privacy", "policy", "thirdParty"];
const AGREEMENT_CHECKED_KEY = "agreementChecked";

function Agreement({
  isEmailVerified = false,
  email = "",
  emailChangeKey = 0,
  onEmailInvalidated,
}) {
  const navigate = useNavigate();
  const { mutate: startSession, isPending } = useStartSession();
  const [isSessionActive, setIsSessionActive] = useState(
    () => !!sessionStorage.getItem(SESSION_STORAGE_KEY),
  );
  const [startError, setStartError] = useState("");

  const getSavedChecked = () => {
    try {
      const saved = sessionStorage.getItem(AGREEMENT_CHECKED_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return null;
  };

  const [checked, setChecked] = useState(
    getSavedChecked() ?? {
      terms: false,
      privacy: false,
      policy: false,
      thirdParty: false,
    },
  );
  const [hasInteracted, setHasInteracted] = useState(false);
  const [openModal, setOpenModal] = useState(null);

  const allChecked = Object.values(checked).every(Boolean);
  const allRequiredChecked = REQUIRED_IDS.every((id) => checked[id]);
  const canStart = isEmailVerified && allRequiredChecked && !isSessionActive;
  const showError = hasInteracted && !allRequiredChecked;

  useEffect(() => {
    if (!isEmailVerified) {
      setIsSessionActive(false);
    }
  }, [isEmailVerified]);

  useEffect(() => {
    if (emailChangeKey > 0) {
      setStartError("");
    }
  }, [emailChangeKey]);

  const handleAllToggle = () => {
    if (isSessionActive) return;
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
    if (isSessionActive) return;
    setHasInteracted(true);
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleStart = () => {
    if (!canStart || isPending) return;
    setStartError("");
    startSession(
      {
        email,
        agreements: {
          termsOfServiceAgreed: checked.terms,
          privacyCollectionAgreed: checked.privacy,
          privacyPolicyAgreed: checked.policy,
          thirdPartySharingAgreed: checked.thirdParty,
        },
      },
      {
        onSuccess: () => {
          sessionStorage.setItem(SESSION_STORAGE_KEY, String(Date.now()));
          sessionStorage.setItem(
            AGREEMENT_CHECKED_KEY,
            JSON.stringify(checked),
          );
          navigate("/input-page/company");
        },
        onError: (error) => {
          const status = error?.status ?? error?.response?.status;
          if (status === 401) {
            clearClientAuthState();
            setIsSessionActive(false);
            setStartError(
              "이메일 인증이 만료되었습니다. 이메일을 다시 인증해 주세요.",
            );
            onEmailInvalidated?.();
            return;
          }
          setStartError("세션을 시작할 수 없습니다. 잠시 후 다시 시도해 주세요.");
        },
      },
    );
  };

  return (
    <div className="w-full max-w-[600px]">
      <h2 className="text-[24px] font-medium leading-[120%] text-black text-center">
        약관 동의
      </h2>

      <div className="w-full mt-[40px]">
        <div className="w-full pb-[12px] flex items-center border-b border-[#858585]">
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
            <div
              key={item.id}
              className="w-full flex items-center justify-between"
            >
              <div
                className="flex items-center gap-[20px] cursor-pointer overflow-visible"
                onClick={() => handleToggle(item.id)}
              >
                <Checkbox
                  checked={checked[item.id]}
                  onChange={() => handleToggle(item.id)}
                />
                <span
                  className={`text-[16px] font-normal leading-[150%] ${item.type === "선택" ? "text-[#717171]" : "text-black"}`}
                >
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
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
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
        {startError && (
          <p className="text-[16px] font-normal leading-[150%] text-[#A40F16] mt-[12px]">
            {startError}
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
          status={canStart && !isPending ? "default" : "disabled"}
          onClick={handleStart}
          className="!w-full"
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

export default Agreement;
