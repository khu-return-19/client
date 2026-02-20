function LoadingSpinner() {
    return (
        <div
            className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0 animate-spin"
            style={{
                background:
                    "conic-gradient(from 148.41deg at 50% 50%, #0057DF -120.96deg, #B9D4FF 92.97deg, #2876F1 155.49deg, #0057DF 239.04deg, #B9D4FF 452.97deg)",
            }}
        >
            <div className="w-[28.8px] h-[28.8px] rounded-full bg-white" />
            <svg
                className="absolute top-0 left-0"
                width="16"
                height="18"
                viewBox="0 0 16 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M14.6124 -0.000179537C11.5882 0.198921 8.66329 1.1584 6.10878 2.7893C3.55427 4.42019 1.45291 6.6697 -0.000446081 9.32923L15.7949 17.9609L14.6124 -0.000179537Z"
                    fill="white"
                />
            </svg>
        </div>
    );
}

export default LoadingSpinner;
