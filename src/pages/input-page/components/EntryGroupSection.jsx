import React from 'react';
import EntryInput from './EntryInput';

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
            className="group w-[50px] h-[50px] shrink-0 cursor-pointer rounded-[4px] border border-[#717171] hover:border-[#09469F] active:border-[#09469F] active:border-2 relative ml-[10px] hover:shadow-[0px_0px_33.6px_0px_#749ADC4D] active:shadow-[0px_0px_33.6px_0px_#749ADC4D] transition-all duration-200"
        >
            <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                <div className="w-[32px] h-[1px] bg-[#717171] group-hover:bg-[#09469F] group-active:bg-[#09469F] transition-colors duration-200"></div>
            </div>
            {type === 'plus' && (
                <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
                    <div className="w-[1px] h-[32px] bg-[#717171] group-hover:bg-[#09469F] group-active:bg-[#09469F] transition-colors duration-200"></div>
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
    width = 1080,
    placeholders = {},
    autocompleteResults = {},
    required = false,
    newItem = null,
    className = '',
    ...props
}) => {

    const handleRowChange = (index, key, value) => {
        if (!onChange) return;
        const newItems = [...items];
        newItems[index] = {
            ...newItems[index],
            [key]: value
        };
        onChange(newItems);
    };

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

    const handleRemove = (index) => {
        if (!onChange) return;
        if (items.length <= 1) return;
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };

    return (
        <div className={`${className}`} style={{ width: typeof width === 'number' ? `${width}px` : width }}>
            {caption && (
                <div className="shrink-0 text-[24px] font-medium text-[#000000] mb-[10px]">
                    {caption}
                    {required && <span className="ml-[4px] text-[#2876F1]">*</span>}
                </div>
            )}
            <div className="flex flex-col gap-[20px]">
                {items.map((row, idx) => {
                    const isLastRow = idx === items.length - 1;
                    return (
                        <div key={idx} className="flex items-center">
                            <div className="flex w-full">
                                {Object.keys(row).map((key) => (
                                    <EntryInput
                                        key={key}
                                        value={row[key] || ''}
                                        onChange={(e) => handleRowChange(idx, key, e.target.value)}
                                        placeholder={placeholders[key] || ''}
                                        autocompleteResults={getCellAutocompleteResults(idx, key)}
                                        className="flex-1"
                                        {...props}
                                    />
                                ))}
                            </div>
                            <StepperButton
                                type={isLastRow ? 'plus' : 'minus'}
                                onClick={() => isLastRow ? handleAdd() : handleRemove(idx)}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default EntryGroupSection;
