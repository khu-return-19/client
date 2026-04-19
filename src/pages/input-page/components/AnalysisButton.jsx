import Button from "./Button";
import { useUserStore } from "stores/userStore";
/**
 * 분석하기 전용 버튼 컴포넌트
 * @param {number} current - 분석 시도 횟수
 * @param {number} total - 최대 분석 횟수 (기본값 3)
 * @param {string} status - 'default' | 'disabled'
 */
const AnalysisButton = ({
  current = 0,
  total = 3,
  status = "default",
  ...props
}) => {
  const count = useUserStore((state) => state.count);

  const countColor =
    status === "disabled" ? "text-[#EEEEEE]" : "text-[#C1D9FF]";

  return (
    <Button
      size="M"
      variant="primary"
      status={status}
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
