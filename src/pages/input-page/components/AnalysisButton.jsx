import cn from "utils/cn";
import Button from "./Button";
import { useNumOfAnalysis } from "api/analysisApi";

const AnalysisButton = ({ total = 3, status = "default", ...props }) => {
  const { data } = useNumOfAnalysis();
  const count = data?.data.count ?? 0;

  return (
    <Button
      size="M"
      variant="primary"
      status={count >= 3 ? "disabled" : status}
      className="gap-[10px]"
      disabled={count >= 3 || status === "disabled"}
      {...props}
    >
      <span>분석하기</span>
      <span
        className={cn(
          count >= 3 || status === "disabled"
            ? "text-[#EEEEEE]"
            : "text-[#C1D9FF]",
        )}
      >
        {3 - count}/{total}
      </span>
    </Button>
  );
};

export default AnalysisButton;
