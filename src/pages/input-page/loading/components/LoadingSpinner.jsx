function LoadingSpinner() {
    return (
        <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 animate-spin"
            style={{
                background:
                    "conic-gradient(from 148.41deg at 50% 50%, #0057DF -120.96deg, #B9D4FF 92.97deg, #2876F1 155.49deg, #0057DF 239.04deg, #B9D4FF 452.97deg)",
            }}
        >
            <div className="w-[28.8px] h-[28.8px] rounded-full bg-white" />
        </div>
    );
}

export default LoadingSpinner;
