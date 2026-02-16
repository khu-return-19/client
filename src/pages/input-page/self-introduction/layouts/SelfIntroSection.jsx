import QuestionCard from "../components/QuestionCard";
import Button from "../../components/Button";
import AnalysisButton from "../../components/AnalysisButton";

function SelfIntroSection() {
  return (
    <div className="w-[1080px] mx-auto mt-[72px] pb-[200px]">
      <QuestionCard />

      <div className="flex flex-col items-center gap-[12px] mt-[120px]">
        <div className="flex gap-[12px]">
          <Button size="s2" variant="secondary">
            임시저장
          </Button>
          <Button size="s2" variant="secondary">
            미리보기
          </Button>
        </div>
        <AnalysisButton status="disabled" />
      </div>
    </div>
  );
}

export default SelfIntroSection;
