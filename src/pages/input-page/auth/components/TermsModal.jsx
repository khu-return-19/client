function TermsModal({ title, url, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/[0.12]"
      onClick={onClose}
    >
      <div
        className="w-[800px] h-[620px] bg-white rounded-[8px] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="w-[752px] mx-auto flex flex-col h-full pt-[24px] pb-[24px]">

          <div className="w-full h-[56px] flex items-center justify-between flex-shrink-0 px-[24px]">
            <span className="text-[20px] font-semibold leading-[120%] text-black">
              {title}
            </span>
            <button onClick={onClose} className="cursor-pointer">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L21 21M21 3L3 21" stroke="#717171" strokeWidth="1.5" />
              </svg>
            </button>
          </div>

          <iframe
            src={url}
            title={title}
            className="mt-[16px] flex-1 w-full border-none [&::-webkit-scrollbar]:hidden"
            style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
          />

        </div>
      </div>
    </div>
  );
}

export default TermsModal;
