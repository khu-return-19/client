import { useState, useEffect, useRef } from "react"
import AngleDownIcon from "../../../../assets/icons/확장.svg"
import NoticeSearchInput from "../components/NoticeSearchInput"

function NoticeListLayout({ filterType, onSelectFilter, searchText, onSearchChange, children }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const FILTER_OPTIONS = ['전체', '중요', '일반'];

    // 외부 클릭 시 드롭다운 닫기
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="w-full flex flex-col min-[769px]:max-w-[1000px] min-[769px]:px-[40px] min-[769px]:pt-[62px] max-[768px]:px-[20px] max-[768px]:max-w-[728px] max-[768px]:pt-[30px]">
            <h1 className="font-['Pretendard'] font-[500] text-[24px] text-[#121212] leading-[120%] max-[768px]:text-[20px] max-[768px]:leading-[140%] max-[768px]:text-[#000000] max-[768px]:font-[600] max-[768px]:tracking-[-1%] mb-[24px] max-[768px]:mb-[30px]">공지사항</h1>
            <div className="flex justify-end gap-[10px] mb-[40px] max-[768px]:hidden">
                <div className="relative" ref={dropdownRef}>
                    <div 
                        className="w-[78px] h-[40px] box-border border-b border-[#717171] flex items-center justify-between px-[10px] cursor-pointer bg-white"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <span className="font-['Pretendard'] font-[400] text-[14px] text-[#717171] select-none">{filterType === '전체' ? '선택' : filterType}</span>
                        <img src={AngleDownIcon} alt="down" className={`w-[16px] h-[16px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute top-[40px] left-0 w-full bg-white border border-[#E5E5E5] shadow-[0px_4px_12px_rgba(0,0,0,0.06)] z-10 flex flex-col select-none">
                            {FILTER_OPTIONS.map(opt => (
                                <div 
                                    key={opt}
                                    className="px-[10px] py-[8px] cursor-pointer hover:bg-[#F4F6F8] font-['Pretendard'] font-[400] text-[14px] text-[#121212]"
                                    onClick={() => {
                                        onSelectFilter(opt);
                                        setIsDropdownOpen(false);
                                    }}
                                >
                                    {opt === '전체' ? '전체' : opt}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <NoticeSearchInput value={searchText} onChange={(e) => onSearchChange(e.target.value)} />
            </div>
            {children}
        </div>
    );
}

export default NoticeListLayout;