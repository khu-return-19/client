import React, { useState, forwardRef } from 'react';
import AutocompleteList from './AutocompleteList';

/**
 * EntryInput Component
 * 정보 기입(Entry) 전용 라인형 인풋 컴포넌트입니다.
 * 
 * @param {string} value - 입력 값
 * @param {function} onChange - 값 변경 핸들러
 * @param {string} placeholder - 플레이스홀더
 * @param {string} className - 추가 스타일 클래스
 * @param {Array} autocompleteResults - 자동완성 결과 배열
 */
const EntryInput = forwardRef(({
    value,
    onChange,
    onFocus,
    onBlur,
    placeholder,
    className = '',
    autocompleteResults = [],
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e) => {
        setIsFocused(true);
        if (onFocus) onFocus(e);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    return (
        <div className={`relative w-full ${isFocused ? 'z-[1000]' : 'z-0'} ${className}`}>
            {/* 인풋 영역: 고정 높이 52px, 레이아웃 밀림 방지를 위해 border를 별도 div로 분리 */}
            <div className="w-full h-[52px] relative flex items-center">
                <input
                    ref={ref}
                    value={value}
                    onChange={onChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    className="
                        w-full h-full
                        bg-transparent 
                        outline-none 
                        placeholder:text-[#717171]
                        text-[#000000]
                        pl-[10px]
                        text-[16px]
                        font-['Pretendard']
                    "
                    {...props}
                />
                {/* 하단 보더 (Layout Shift 방지) */}
                <div
                    className={`absolute bottom-0 left-0 w-full transition-all duration-200 ${isFocused ? 'h-[2px] bg-[#09469F]' : 'h-[1px] bg-[#717171]'
                        }`}
                />
            </div>

            {/* 자동완성 리스트 (포커스 중이고 결과가 있을 때만 표시) */}
            {isFocused && autocompleteResults.length > 0 && (
                <AutocompleteList
                    results={autocompleteResults}
                    onSelect={(item) => {
                        // 선택 시 onChange를 트리거하여 상태 업데이트
                        if (onChange) {
                            onChange({
                                target: {
                                    value: item,
                                    name: props.name
                                }
                            });
                        }
                        // 선택 완료 후 리스트 닫기
                        setIsFocused(false);
                    }}
                />
            )}
        </div>
    );
});

EntryInput.displayName = 'EntryInput';

export default EntryInput;
