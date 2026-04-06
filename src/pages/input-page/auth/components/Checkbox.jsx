function Checkbox({ checked, onChange }) {
  return (
    <div
      className="relative w-[24px] h-[24px] flex-shrink-0 cursor-pointer group"
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
          style={{ overflow: "visible" }}
        >
          <defs>
            <filter id="checkbox-hover-shadow" x="-150%" y="-150%" width="400%" height="400%" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="16.8" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.45645 0 0 0 0 0.604982 0 0 0 0 0.861538 0 0 0 0.3 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
            </filter>
          </defs>
          <g filter="url(#checkbox-hover-shadow)">
            <rect x="33.5996" y="20" width="24" height="24" rx="2" fill="white" />
            <rect x="34.0996" y="20.5" width="23" height="23" rx="1.5" stroke="#09469F" />
          </g>
          <path d="M38.5996 31.7895L43.4272 36L52.5996 28" stroke="#09469F" strokeWidth="1.5" />
        </svg>
      )}
    </div>
  );
}

export default Checkbox;
