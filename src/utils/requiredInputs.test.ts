import { extractRequiredInputs, splitRequiredInputs } from "./requiredInputs";

describe("splitRequiredInputs", () => {
  it("splits text around required-input blanks", () => {
    expect(splitRequiredInputs("A [입력 필요: 개선 전 수치]에서 B")).toEqual([
      { type: "text", value: "A " },
      { type: "input", label: "개선 전 수치" },
      { type: "text", value: "에서 B" },
    ]);
  });

  it("accepts a blank without a space after the colon", () => {
    expect(splitRequiredInputs("[입력 필요:담당 범위]")).toEqual([
      { type: "input", label: "담당 범위" },
    ]);
  });

  it("returns plain text unchanged when there is no blank", () => {
    expect(splitRequiredInputs("빈칸 없음")).toEqual([{ type: "text", value: "빈칸 없음" }]);
    expect(splitRequiredInputs(undefined)).toEqual([]);
  });
});

describe("extractRequiredInputs", () => {
  it("lists blank labels in order without duplicates", () => {
    expect(
      extractRequiredInputs("[입력 필요: 역할] 그리고 [입력 필요: 수치], 다시 [입력 필요: 역할]"),
    ).toEqual(["역할", "수치"]);
  });
});
