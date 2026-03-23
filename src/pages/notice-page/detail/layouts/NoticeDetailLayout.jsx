import { useNavigate } from "react-router-dom";
import AngleLeftIcon from "../../../../assets/icons/AngleLeft.svg"
import FileIcon from "../../../../assets/icons/File.svg"
import NoticeBadge from "../../components/NoticeBadge";
const notice = {
        type: 1,
        date: '2026-03-24',
        title: '서비스 점검 안내',
        content: `안녕하세요.Pertineo 서비스가 베타 버전으로 정식 오픈되었습니다.
본 서비스는 자기소개서의 구조, 표현력, 키워드 적합도, 직무 연관성 등을 다각도로 분석하여 맞춤형 개선 전략을 제안하는 것을 목표로 합니다.현재는 서비스 안정화 및 고도화를 위한 베타 운영 기간으로, 아래 사항을 반드시 확인해주시기 바랍니다.

1. 베타 운영 기간 안내
운영 기간: 2026년 3월 1일 ~ 2026년 4월 30일
운영 형태: 회원가입 후 분석 기능 이용 가능
일부 분석 지표는 테스트 단계로, 지속적으로 보완·개선될 예정입니다.
2. 분석 데이터 및 결과 안내
분석 결과는 자체 개발 알고리즘과 데이터 기반 모델을 활용해 도출됩니다.
결과 리포트는 참고용 자료이며, 최종 합격을 보장하지 않습니다.
베타 기간 동안 분석 기준 및 지표는 고지 없이 일부 변경될 수 있습니다.
3. 개인정보 및 데이터 활용 안내
업로드된 자기소개서 데이터는 분석 및 서비스 개선 목적에 한해 활용됩니다.
모든 데이터는 암호화되어 안전하게 관리됩니다.
베타 종료 후 일부 분석 기록은 초기화될 수 있습니다.
4. 서비스 이용 제한 사항
타인의 자기소개서를 무단 업로드하는 행위는 금지됩니다.
비정상적인 대량 업로드 및 시스템 악용 시 이용이 제한될 수 있습니다.
시스템 점검 시 일시적으로 분석 기능이 중단될 수 있습니다.
5. 피드백 접수 안내
보다 정교한 분석 서비스 제공을 위해 사용자 의견을 적극 반영하고 있습니다.
오류 제보 및 기능 개선 제안: [고객센터 > 문의하기]
주요 개선 사항은 추후 업데이트 공지를 통해 안내드릴 예정입니다.
본 베타 서비스는 실제 취업 준비 과정에 실질적인 도움이 되는 분석 도구를 구축하기 위한 단계입니다.이용자 여러분의 경험과 피드백이 서비스 완성도를 높이는 데 중요한 역할을 합니다.
감사합니다.`,
        fileURL: "https://www.google.com",
        fileName: "첨부파일.pdf",
    };

function NoticeDetailLayout() {
    const navigate = useNavigate();
    
    return (
        <div className="w-full min-[769px]:max-w-[1000px] min-[769px]:px-[40px] min-[769px]:pt-[80px] max-[768px]:px-[20px] max-[768px]:max-w-[728px] max-[768px]:pt-[18px] mb-[200px]">
            <button className="outline-none border-none cursor-pointer bg-transparent" onClick={() => navigate(-1)}>
                <img src={AngleLeftIcon} alt="left" className="w-[32px] h-[32px]" />
            </button>
            <div className="flex items-center mt-[40px] mb-[16px] max-[768px]:mt-[24px] max-[768px]:mb-[20px]">
                <NoticeBadge type={notice.type} />
                <span className="font-['Pretendard'] font-[400] text-[14px] max-[768px]:text-[12px] text-[#717171]">{notice.date}</span>
            </div>
            <h1 className="w-full pb-[16px] border-b-[1px] border-[#AEB4BC] font-['Pretendard'] font-[600] text-[20px] max-[768px]:text-[16px] text-[#121212] leading-[140%] tracking-[-1%] mb-[72px] max-[768px]:mb-[30px]">{notice.title}</h1>
            <p className="font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[14px] text-[#121212] leading-[150%] whitespace-pre-line mb-[68px] max-[768px]:px-[10px] box-border">{notice.content}</p>
            {notice.fileURL && <div className="flex items-center pl-[13px] max-[768px]:pl-[12px] gap-[10px] h-[60px] max-[768px]:h-[40px] box-border border-b border-t border-[#AEB4BC] mt-[12px] mb-[60px]">
                <img src={FileIcon} alt="file" className="w-[24px] h-[24px]" />
                <button className="outline-none border-none cursor-pointer bg-transparent font-['Pretendard'] font-[400] text-[16px] max-[768px]:text-[14px] text-[#121212] leading-[150%] tracking-[-1%] underline" onClick={() => window.open(notice.fileURL, '_blank')}>{notice.fileName}</button>
            </div>}
            <div className="flex w-full min-[769px]:justify-end max-[768px]:justify-center">
                <button className="outline-none border-none cursor-pointer bg-transparent" onClick={() => navigate(-1)}>
                    <div className="w-[120px] h-[44px] flex justify-center items-center border border-[#0D326F] rounded-[6px]">
                        <span className="font-[500] text-[16px] text-[#0D326F] leading-[150%]">목록</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default NoticeDetailLayout;
