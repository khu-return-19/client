const REQUIRED_INPUT = /\[입력\s*필요\s*[:：]\s*([^\]\n]+)]/g;

export type ReplySegment =
  | { type: "text"; value: string }
  | { type: "input"; label: string };

export function splitRequiredInputs(text: string | null | undefined): ReplySegment[] {
  if (!text) return [];
  const segments: ReplySegment[] = [];
  let last = 0;
  for (const match of text.matchAll(REQUIRED_INPUT)) {
    const start = match.index ?? 0;
    if (start > last) segments.push({ type: "text", value: text.slice(last, start) });
    segments.push({ type: "input", label: match[1].trim() });
    last = start + match[0].length;
  }
  if (last < text.length) segments.push({ type: "text", value: text.slice(last) });
  return segments;
}

export function extractRequiredInputs(text: string | null | undefined): string[] {
  const labels = splitRequiredInputs(text)
    .filter((s): s is { type: "input"; label: string } => s.type === "input")
    .map((s) => s.label);
  return Array.from(new Set(labels));
}
