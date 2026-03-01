import graphImg from "../../../assets/imgs/3DModelGraph.svg"

function ThreeDGraph() {
    return (
        <div className="w-[430px] h-[430px] rounded-full border border-[#2876F1] border-dashed flex items-center justify-center">
            <img src={graphImg} alt="3D 모델 그래프" className="w-[326px] h-[298px]" />
        </div>
    )
}

export default ThreeDGraph