function Checkbox({ checked, onChange }) {
  return (
    <div
      className="relative w-[24px] h-[24px] flex-shrink-0 cursor-pointer group overflow-visible"
      onClick={e => { e.stopPropagation(); onChange(e); }}
    >
      {!checked && (
        <div className="w-[24px] h-[24px] rounded-[2px] bg-white border border-[#717171] group-hover:opacity-0 transition-opacity" />
      )}
      {checked && (
        <div className="w-[24px] h-[24px] rounded-[2px] bg-[#09469F] flex items-center justify-center">
          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.53125 5.03033L5.03125 9.53033L14.0312 0.530334" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>
      )}

      {!checked && (
        <svg
          width="24"
          height="24"
          viewBox="33.5996 20 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        >
          <rect x="33.5996" y="20" width="24" height="24" rx="2" fill="white" />
          <rect x="34.0996" y="20.5" width="23" height="23" rx="1.5" stroke="#09469F" />
          <path d="M38.5996 31.7895L43.4272 36L52.5996 28" stroke="#09469F" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export default Checkbox;
