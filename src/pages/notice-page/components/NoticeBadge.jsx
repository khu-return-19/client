function NoticeBadge({ type }) {
    return (
        <div 
            className="w-[49px] h-[24px] max-[768px]:w-[33px] max-[768px]:h-[21px] flex justify-center items-center mr-[40px] max-[768px]:mr-[10px] rounded-[28px]" 
            style={type === 1 ? { backgroundColor: '#09469F' } : {}}
        >
            <span 
                className="text-[14px] max-[768px]:text-[12px] font-[400] text-[#717171]" 
                style={type === 1 ? { color: '#ffffff' } : {}}
            >
                {type === 1 ? '중요' : '일반'}
            </span>
        </div>
    );
}

export default NoticeBadge;
