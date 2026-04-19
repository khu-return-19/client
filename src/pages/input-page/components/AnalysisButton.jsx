import { useEffect, useState } from "react";
import Button from "./Button";
import api from "api/axiosInstance";

/**
 * 분석하기 전용 버튼 컴포넌트
 * @param {number} current - 분석 시도 횟수
 * @param {number} total - 최대 분석 횟수 (기본값 3)
 * @param {string} status - 'default' | 'disabled'
 * @param {string} email - 사용자 이메일
 */
const AnalysisButton = ({
  current = 0,
  total = 3,
  status = "default",
  email,
  ...props
}) => {
  const [count, setCount] = useState(0);
  const [btnStatus, setBtnStatus] = useState(status);

  // API에서 count 가져오기 - 화면에 나타날때마다 렌더링
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await api.get(
          `/api/auth/email/credit?email=${email}`,
          { headers: { "X-API-Version": "2" } }
        );
        const creditCount = response.data?.credit || 0;
        setCount(creditCount);
      } catch (error) {
        console.error("Failed to fetch credit:", error);
        setCount(3);
      }
    };
    
    if (email) fetchCount();
  }, [email, props]);

  // count 변화 감지해서 btnStatus 업데이트
  useEffect(() => {
    setBtnStatus(count === 3 ? "disabled" : "default");
  }, [count]);

  const countColor =
    btnStatus === "disabled" ? "text-[#EEEEEE]" : "text-[#C1D9FF]";

  return (
    <Button
      size="M"
      variant="primary"
      status={btnStatus}
      className="gap-[10px]"
      {...props}
    >
      <span>분석하기</span>
      <span className={`${countColor}`}>
        {3 - count}/{total}
      </span>
    </Button>
  );
};

export default AnalysisButton;
