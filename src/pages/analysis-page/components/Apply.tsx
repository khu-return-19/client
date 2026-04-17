import { useNavigate } from "react-router-dom";
import AnalysisHeader from "./AnalysisHeader";
import { useAnalysisStore } from "stores/analysisStore";

export default function Apply({ onPrev }: { onPrev?: () => void }) {
  const navigate = useNavigate();
  const { revisedResult, normalData } = useAnalysisStore();

  return (
    <div className="flex flex-col">
      <AnalysisHeader title="전략 반영 자기소개서 수정본" className="mb-2" />
      <div className="text-[14px] text-gray900 mb-10">
        *본 개선된 자기소개서는 모범적인 예시로 참고만 하시되 본인의경험을 잘
        녹여내어 작성하시길 바랍니다.
      </div>
      {revisedResult?.best_reply.map((reply, index) => (
        <div
          key={reply}
          className="pb-[70px] mb-[70px] border-dashed border-b-[1px] border-b-[#B5B5B5]"
        >
          <section>
            <h3 className="text-xl pb-[30px]">
              [ {normalData?.questionList[index]} ]
            </h3>
            <h4 className="text-xl text-gray900 pb-[10px]">내 응답</h4>
            <div className="pb-10">{normalData?.answerList[index]}</div>
            <h4 className="text-xl text-gray900 pb-[10px]">개선된 응답</h4>
            <div className="pb-10">{revisedResult?.best_reply[index]}</div>
            <h4 className="text-xl text-gray900 pb-[10px]">개선된 근거</h4>
            <div className="pb-10">{revisedResult?.reply_reason[index]}</div>
            <h4 className="text-xl text-gray900 pb-[10px]">기대 효과</h4>
            <div>{revisedResult?.expectation[index]}</div>
          </section>
        </div>
      ))}
      {/* <AnalysisHeader title="수정된 자기소개서 3D 역량평가" />
      <div className="flex flex-col gap-5">
        <div>
          <div>학습수준</div>
          <div>근거:</div>
        </div>

        <div>
          <div>학습수준</div>
          <div>근거:</div>
        </div>
        <div>
          <div>학습수준</div>
          <div>근거:</div>
        </div>
      </div> */}
      {/* 하단 버튼 */}
      <div className="flex justify-center gap-[16px] pt-[120px] pb-[60px]">
        <button
          onClick={onPrev}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          이전
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#717171] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)] border border-transparent hover:border-[#09469F] hover:text-[#09469F] transition-colors"
        >
          메인으로
        </button>
      </div>
    </div>
  );
}
