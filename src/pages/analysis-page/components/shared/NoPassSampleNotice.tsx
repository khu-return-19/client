import cn from "utils/cn";

// 합격자 표본이 없을 때 비교 대신 보여 주는 안내 문구. 기획이 정한 문구라 그대로 둔다 (QA TC-01).
export const NO_PASS_SAMPLE_NOTICE = [
  "합격자 데이터 없음으로 직접 비교는 불가합니다.",
  "비교 가능한 표본이 없어 확률 산정 대신 현재 증거만 기준으로 판단했습니다.",
];

export default function NoPassSampleNotice({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-[4px] font-['Pretendard']", className)}>
      {NO_PASS_SAMPLE_NOTICE.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}
