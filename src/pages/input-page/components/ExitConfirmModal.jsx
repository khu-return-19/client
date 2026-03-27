import XIcon from '../../../assets/icons/x.svg'
import WarningIcon from '../../../assets/icons/warning.svg'

function ExitConfirmModal({ onExit, onCancel }) {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000030] z-50 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center w-[600px] h-[320px] bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] relative">
                <button className="absolute top-[20px] right-[20px] w-[24px] h-[24px] flex justify-center items-center" onClick={onCancel}>
                    <img src={XIcon} alt="close" />
                </button>
                <img src={WarningIcon} alt="warning" className="w-[32px] h-[32px] mb-[22px]" />
                <h1 className="text-[20px] font-[500] text-black mb-[10px]">사이트에서 나가시겠습니까?</h1>
                <p className="text-[16px] text-black mb-[40px]">지금 돌아가면 변경 사항이 삭제됩니다.</p>
                <div className='flex gap-[10px]'>
                    <button className='flex items-center justify-center w-[160px] h-[44px] bg-[#FFFFFF] rounded-[6px] text-[16px] font-[500] text-[#717171] outline-none border-none shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]' onClick={onCancel}>취소</button>
                    <button className='flex items-center justify-center w-[160px] h-[44px] bg-[#09469F] rounded-[6px] text-[16px] font-[500] text-[#FFFFFF] outline-none border-none' onClick={onExit}>나가기</button>
                </div>
            </div>
        </div>
    )
}

export default ExitConfirmModal;