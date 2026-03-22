import React from 'react';
import EntryInput from '../../components/EntryInput';

/**
 * StepperButton Component
 * 플러스/마이너스 버튼
 */
const StepperButton = ({
    onClick,
    type
}) => {
    return (
        <div
            onClick={onClick}
            className="group w-[36px] h-[36px] max-[893px]:w-[28px] max-[893px]:h-[28px] shrink-0 cursor-pointer rounded-[4px] border border-[#717171] hover:border-[#09469F] active:border-[#09469F] active:border-2 relative ml-[10px] hover:shadow-[0px_0px_33.6px_0px_#749ADC4D] active:shadow-[0px_0px_33.6px_0px_#749ADC4D] transition-all duration-200"
        >
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                <div className="w-[23px] max-[893px]:w-[18px] h-[1px] bg-[#717171] group-hover:bg-[#09469F] group-active:bg-[#09469F] transition-colors duration-200"></div>
            </div>
            {type === 'plus' && (
                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                    <div className="w-[1px] h-[23px] max-[893px]:h-[18px] bg-[#717171] group-hover:bg-[#09469F] group-active:bg-[#09469F] transition-colors duration-200"></div>
                </div>
            )}
        </div>
    );
};

/**
 * EntryGroupSection Component
 * 캡션과 함께 여러 줄의 EntryInput 그룹(객체)을 관리하는 컴포넌트입니다.
 * 
 * @param {string} caption - 좌측/상단에 표시될 라벨
 * @param {Array} items - 입력 데이터 배열
 * @param {function} onChange - 배열 전체가 변경될 때 호출되는 핸들러
 * @param {string|number} width - 섹션 전체의 너비
 * @param {Object} placeholders - 각 키별 플레이스홀더 객체
 * @param {Object} autocompleteResults - 각 키별 자동완성 결과 객체
 * @param {boolean} required - 필수 여부
 * @param {Object} newItem - 행 추가 시 기본값 객체
 */
const EntryGroupSection = ({
    caption,
    items = [],
    onChange,
    placeholders = {},
    autocompleteResults = {},
    required = false,
    newItem = null,
    className = '',
    ...props
}) => {

    // 행 값 변경 핸들러
    const handleRowChange = (index, key, value) => {
        if (!onChange) return;
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [key]: value
        };
        onChange(newItems);
    };

    // 특정 셀의 자동완성 결과를 가져오는 헬퍼
    const getCellAutocompleteResults = (index, key) => {
        if (!autocompleteResults) return [];
        if (autocompleteResults[index] && autocompleteResults[index][key]) {
            return autocompleteResults[index][key];
        }
        if (autocompleteResults[key]) {
            return autocompleteResults[key];
        }
        return [];
    };

    // 행 추가 핸들러
    const handleAdd = () => {
        if (!onChange) return;

        let newRow = {};
        if (newItem) {
            newRow = { ...newItem };
        } else {
            const template = items.length > 0 ? items[0] : {};
            newRow = Object.keys(template).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
        }

        onChange([...items, newRow]);
    };

    // 행 삭제 핸들러
    const handleRemove = (index) => {
        if (!onChange) return;
        if (items.length <= 1) {
            const clearedRow = Object.keys(items[0]).reduce((acc, key) => {
                acc[key] = '';
                return acc;
            }, {});
            onChange([clearedRow]);
            return;
        }
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <div className={`w-full min-[894px]:max-w-[1080px] max-[893px]:max-w-[452px] ${className}`}>
            <div className="flex items-center justify-between">
                <div className="shrink-0 text-[24px] max-[893px]:text-[16px] font-normal text-[#000000] mb-[12px] max-[893px]:mb-[4px]">
                    {caption}
                    {required && <span className="ml-[4px] text-[#2876F1]">*</span>}
                </div>
                <StepperButton
                    type="plus"
                    onClick={handleAdd}
                />
            </div>
            <div className="flex flex-col gap-[20px] max-[893px]:gap-[24px]">
                {items.map((row, idx) => {
                    const keys = Object.keys(row);
                    return (
                        <div key={idx} className="flex flex-col">
                            <div className="flex items-end">
                                <div className="grid w-full max-[767px]:grid-cols-1 grid-cols-2 gap-y-[4px] gap-x-[4px] min-[894px]:flex min-[894px]:gap-0">
                                    {keys.map((key, kIdx) => {
                                        const isOddLast = kIdx === keys.length - 1 && keys.length % 2 !== 0;
                                        return (
                                            <EntryInput
                                                key={key}
                                                value={row[key] || ''}
                                                onChange={(e) => handleRowChange(idx, key, e.target.value)}
                                                placeholder={placeholders[key] || ''}
                                                autocompleteResults={getCellAutocompleteResults(idx, key)}
                                                className={`flex-1 ${isOddLast ? 'min-[768px]:max-[893px]:col-span-2' : ''}`}
                                                {...props}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="max-[893px]:hidden">
                                    <StepperButton
                                        type="minus"
                                        onClick={() => handleRemove(idx)}
                                    />
                                </div>
                            </div>
                            
                            {/* 모바일 삭제 버튼 영역 */}
                            <div className="hidden max-[893px]:flex justify-end mt-[12px]">
                                <button
                                    onClick={() => handleRemove(idx)}
                                    className="text-[#717171] font-['Pretendard'] text-[15px] font-normal leading-[160%] underline underline-offset-auto"
                                >
                                    삭제
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EntryGroupSection;
