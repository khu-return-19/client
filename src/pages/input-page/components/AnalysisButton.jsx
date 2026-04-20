import Button from "./Button";
import { useNumOfAnalysis } from "api/analysisApi";

const AnalysisButton = ({ total = 3, status = "default", ...props }) => {
  const { data } = useNumOfAnalysis();
  const count = data?.data.count ?? 0;
  console.log(count);
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
