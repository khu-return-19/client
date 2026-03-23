import SearchIcon from "../../../../assets/icons/검색.svg"

function NoticeSearchInput({ value, onChange }) {
    return (
        <div className="w-[255px] h-[40px] border-b focus-within:border-b-[2px] focus-within:bg-[#F4F6F8] border-[#717171] focus-within:border-[#09469F] flex items-center justify-between px-[10px] box-border transition-all">
            <input type="text" value={value} onChange={onChange} placeholder="검색" className="w-[201px] h-[20px] outline-none border-none placeholder:text-[#717171] bg-transparent font-[400] text-[14px] font-['Pretendard'] text-black" />
            <img src={SearchIcon} alt="search" className="w-[24px] h-[24px]" />
        </div>
    );
}

export default NoticeSearchInput;