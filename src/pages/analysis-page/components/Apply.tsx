import { useNavigate } from "react-router-dom";
import AnalysisHeader from "./AnalysisHeader";
import { useAnalysisStore } from "stores/analysisStore";
import { extractRequiredInputs, splitRequiredInputs } from "utils/requiredInputs";

export default function Apply({
  onPrev,
  onDownload,
  isGenerating,
}: {
  onPrev?: () => void;
  onDownload?: () => void;
  isGenerating?: boolean;
}) {
  const navigate = useNavigate();
  const { revisedResult, normalData } = useAnalysisStore();
  const requiredInputsPerAnswer = (revisedResult?.best_reply ?? []).map(
    (reply, index) =>
      revisedResult?.required_inputs?.[index] ?? extractRequiredInputs(reply),
  );
  const requiredInputCount = requiredInputsPerAnswer.reduce(
    (sum, inputs) => sum + inputs.length,
    0,
  );

  return (
    <div className="flex flex-col">
      <AnalysisHeader title="전략 반영 자기소개서 수정본" className="mb-2" />
      <div className="text-[14px] text-gray900 mb-10">
        *본 개선된 자기소개서는 모범적인 예시로 참고만 하시되 본인의경험을 잘
        녹여내어 작성하시길 바랍니다.
      </div>
      {requiredInputCount > 0 && (
        <div
          role="alert"
          className="mb-[60px] rounded-[8px] border border-[#F2B84B] bg-[#FFF8E6] px-[24px] py-[20px]"
        >
          <p className="text-[16px] font-semibold text-[#8A5A00] pb-[6px]">
            직접 채워야 하는 항목이 {requiredInputCount}개 있어요. 이대로 제출하지
            마세요.
          </p>
          <p className="text-[14px] text-[#6B4A00] leading-[150%]">
            수정본은 작성하신 답변에 있는 사실만으로 만들었어요. 원문에 없는
            성과나 수치는 노란색 빈칸으로 남겨 두었으니, 실제 경험으로 채운 뒤
            사용해 주세요.
          </p>
        </div>
      )}
      {revisedResult?.best_reply.map((reply, index) => (
        <div
          key={index}
          className="pb-[70px] mb-[70px] border-dashed border-b-[1px] border-b-[#B5B5B5]"
        >
          <section>
            <h3 className="text-xl pb-[30px]">
              [ {normalData?.questionList[index]} ]
            </h3>
            <h4 className="text-xl text-gray900 pb-[10px]">내 응답</h4>
            <div className="pb-10">{normalData?.answerList[index]}</div>
            <h4 className="text-xl text-gray900 pb-[10px]">개선된 응답</h4>
            <div className="pb-10 leading-[180%]">
              <ReplyWithBlanks text={reply} />
            </div>
            {requiredInputsPerAnswer[index].length > 0 && (
              <div className="mb-10 rounded-[6px] bg-[#F9FAFB] px-[20px] py-[16px]">
                <h5 className="text-[15px] font-semibold text-[#111] pb-[8px]">
                  직접 채울 항목
                </h5>
                <ul className="flex flex-col gap-[6px] list-disc pl-[20px] text-[15px] text-[#111]">
                  {requiredInputsPerAnswer[index].map((label) => (
                    <li key={label}>{label}</li>
                  ))}
                </ul>
              </div>
            )}
            <h4 className="text-xl text-gray900 pb-[10px]">개선된 근거</h4>
            <div className="pb-10">
              <ReplyWithBlanks text={revisedResult?.reply_reason[index]} />
            </div>
            <h4 className="text-xl text-gray900 pb-[10px]">기대 효과</h4>
            <div>
              <ReplyWithBlanks text={revisedResult?.expectation[index]} />
            </div>
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
      <div className="flex justify-center gap-[16px] pt-[120px] pb-[120px]">
        <button
          onClick={() => navigate("/")}
          className="w-[160px] h-[44px] bg-white rounded-[6px] text-[16px] font-medium text-[#0D326F] border border-[#09469F] hover:bg-[#ECF1F8] transition-all duration-200"
        >
          메인으로
        </button>
        <button
          onClick={onDownload}
          disabled={isGenerating}
          className="w-[160px] h-[44px] bg-[#09469F] text-white text-[16px] font-medium rounded-[6px] hover:bg-[#0D326F] transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              생성 중...
            </>
          ) : (
            "리포트 다운로드"
          )}
        </button>
      </div>
    </div>
  );
}

function ReplyWithBlanks({ text }: { text?: string }) {
  return (
    <>
      {splitRequiredInputs(text).map((segment, index) =>
        segment.type === "text" ? (
          <span key={index}>{segment.value}</span>
        ) : (
          <mark
            key={index}
            className="rounded-[4px] bg-[#FFE7A3] px-[6px] py-[1px] font-medium text-[#8A5A00]"
          >
            [입력 필요: {segment.label}]
          </mark>
        ),
      )}
    </>
  );
}
