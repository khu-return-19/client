import EntryInput from "../../components/EntryInput";

/**
 * EntrySection Component
 * 캡션과 단일 EntryInput을 렌더링하는 섹션 컴포넌트입니다.
 *
 * @param {string} caption - 좌측/상단에 표시될 라벨
 * @param {string} value - 입력 값
 * @param {function} onChange - 값 변경 핸들러
 * @param {string|number} width - 입력 박스의 너비 (기본값: 1020px)
 * @param {string} placeholder - 플레이스홀더
 * @param {boolean} required - 필수 여부
 * @param {Array} autocompleteResults - 자동완성 결과 리스트
 * @param {string} className - 추가 스타일 클래스
 */
const EntrySection = ({
  caption,
  value,
  onChange,
  width = 1020,
  placeholder = "",
  autocompleteResults = [],
  required = false,
  className = "",
  ...props
}) => {
  return (
    <div className={`w-full ${className}`} style={{ maxWidth: `${width}px` }}>
      {caption && (
        <div className="shrink-0 text-[24px] max-[893px]:text-[16px] font-normal text-[#000000] mb-[12px] max-[893px]:mb-[4px]">
          {caption}
          {required && <span className="ml-[4px] text-[#2876F1]">*</span>}
        </div>
      )}
      <div className="flex items-center">
        <EntryInput
          value={value || ""}
          onChange={(e) => onChange && onChange(e.target.value)}
          placeholder={placeholder}
          autocompleteResults={autocompleteResults}
          {...props}
        />
      </div>
    </div>
  );
};

export default EntrySection;
