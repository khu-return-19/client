import XIcon from '../../../assets/icons/x.svg'
import WarningIcon from '../../../assets/icons/warning.svg'

function RequiredFieldModal({ onClose, hasCompany, hasRole, hasEducation, hasCoverLetter }) {
    return (
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#00000030] z-50 flex justify-center items-center">
            <div className="flex flex-col items-center justify-center w-[600px] h-[386px] bg-white rounded-[10px] shadow-[0px_0px_20px_0px_rgba(0,0,0,0.12)] relative">
                <button className="absolute top-[20px] right-[20px] w-[24px] h-[24px] flex justify-center items-center" onClick={onClose}>
                    <img src={XIcon} alt="close" />
                </button>
                <img src={WarningIcon} alt="warning" className="w-[32px] h-[32px] mb-[20px]" />
                <h1 className="text-[20px] font-[500] text-black mb-[10px]">필수 항목을 모두 입력해주세요</h1>
                <div className='flex flex-col gap-[2px] mb-[22px]'>
                    <p className={`text-[16px] leading-[150%] ${hasCompany ? 'text-[#000000]' : 'text-[#A40F16]'}`}>지원 회사명</p>
                    <p className={`text-[16px] leading-[150%] ${hasRole ? 'text-[#000000]' : 'text-[#A40F16]'}`}>지원 직무</p>
                    <p className={`text-[16px] leading-[150%] ${hasEducation ? 'text-[#000000]' : 'text-[#A40F16]'}`}>학력사항</p>
                    <p className={`text-[16px] leading-[150%] ${hasCoverLetter ? 'text-[#000000]' : 'text-[#A40F16]'}`}>자기소개서</p>
                </div>
                <button className='flex items-center justify-center w-[160px] h-[44px] bg-[#FFFFFF] rounded-[6px] text-[16px] font-[500] text-[#717171] outline-none border-none shadow-[0px_0px_10px_0px_rgba(0,0,0,0.12)]' onClick={onClose}>확인</button>
            </div>
        </div>
    )
}

export default RequiredFieldModal;