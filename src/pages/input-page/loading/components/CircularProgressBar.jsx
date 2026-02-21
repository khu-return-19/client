import "./loading.css";

function CircularProgressBar({ progress = 0 }) {
    const clampedProgress = Math.min(100, Math.max(0, progress));
    const progressDeg = (clampedProgress / 100) * 360;

    return (
        <div className="relative w-9 h-9 rounded-full flex items-center justify-center shrink-0">
            <div
                className="absolute inset-0 rounded-full"
                style={{ background: "#E8E8E8" }}
            />

            <div
                className="absolute inset-0 rounded-full"
                style={{
                    "--progress-deg": `${progressDeg}deg`,
                    background:
                        "conic-gradient(from 148.41deg at 50% 50%, #0057DF -120.96deg, #B9D4FF 92.97deg, #2876F1 155.49deg, #0057DF 239.04deg, #B9D4FF 452.97deg)",
                    mask: "conic-gradient(from 0deg at 50% 50%, black 0deg, black var(--progress-deg), transparent var(--progress-deg))",
                    WebkitMask:
                        "conic-gradient(from 0deg at 50% 50%, black 0deg, black var(--progress-deg), transparent var(--progress-deg))",
                    transition: "--progress-deg .5s ease-out",
                }}
            />

            <div className="absolute w-full h-full flex items-center justify-center">
                <div className="inset-[3.6px] rounded-full bg-white w-[28px] h-[28px]" />
            </div>
        </div>
    );
}

export default CircularProgressBar;


