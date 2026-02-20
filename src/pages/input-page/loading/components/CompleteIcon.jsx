import checkIcon from "assets/icons/체크.svg";

function CompleteIcon() {
    return (
        <div
            className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
            style={{
                background:
                    "linear-gradient(141.24deg, #B9D4FF 19.81%, #2876F1 53.21%, #0057DF 82.62%)",
            }}
        >
            <img src={checkIcon} alt="완료" />
        </div>
    );
}

export default CompleteIcon;
