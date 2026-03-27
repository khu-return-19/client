import { useEffect, useState } from "react";
import CheckCircleIcon from "../../../assets/icons/CheckCircle.svg";

function Toast({ message, onClose }) {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const animateTimer = setTimeout(() => setWidth(100), 10);

        const closeTimer = setTimeout(() => {
            onClose();
        }, 1500);

        return () => {
            clearTimeout(animateTimer);
            clearTimeout(closeTimer);
        }
    }, [onClose]);

    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000030] z-50 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center gap-[20px] w-[462px] h-[200px] bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] relative overflow-hidden">
                <img src={CheckCircleIcon} alt="check circle" />
                <p className="text-[20px] font-[500] text-black">{message}</p>
                <div 
                    className="absolute h-[6px] bg-[#2876F1] bottom-0 left-0 transition-all duration-[1500ms] ease-linear"
                    style={{ width: `${width}%` }}
                />
            </div>
        </div>
    )
}

export default Toast;