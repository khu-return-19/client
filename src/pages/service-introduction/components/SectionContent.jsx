function SectionContent({ title, children, titleBottom = 30, marginBottom = 100 }) {
    return (
        <div className="w-full flex flex-col" style={{ marginBottom: `${marginBottom}px` }}>
            <h2 className="text-[24px] font-[600] text-[#002983]" style={{ marginBottom: `${titleBottom}px` }}>{title}</h2>
            {children}
        </div>
    )
}

export default SectionContent