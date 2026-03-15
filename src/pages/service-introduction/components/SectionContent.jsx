function SectionContent({ title, children, marginBottom = 100, titleStyle = "" }) {
    return (
        <div className="w-full flex flex-col" style={{ marginBottom: `${marginBottom}px` }}>
            <h2 className={`text-[24px] font-[600] text-[#002983] mb-[30px] max-[768px]:text-[20px] ${titleStyle}`}>{title}</h2>
            {children}
        </div>
    )
}

export default SectionContent