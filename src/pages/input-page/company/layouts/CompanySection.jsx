import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntrySection from "../components/EntrySection";
import Button from "../../components/Button";

function CompanySection() {
    const navigate = useNavigate();

    // 1. 상태 정의
    const [companyName, setCompanyName] = useState(() => sessionStorage.getItem('company_companyName') || '');
    const [jobTitle, setJobTitle] = useState(() => sessionStorage.getItem('company_jobTitle') || '');
    const [noticeUrl, setNoticeUrl] = useState(() => sessionStorage.getItem('company_noticeUrl') || '');

    // 세션스토리지 저장
    useEffect(() => { sessionStorage.setItem('company_companyName', companyName); }, [companyName]);
    useEffect(() => { sessionStorage.setItem('company_jobTitle', jobTitle); }, [jobTitle]);
    useEffect(() => { sessionStorage.setItem('company_noticeUrl', noticeUrl); }, [noticeUrl]);

    // 2. 자동완성용 결과 상태
    const [companyResults, setCompanyResults] = useState([]);
    const [jobTitleResults, setJobTitleResults] = useState([]);

    // 3. 더미 데이터 필터링 로직
    useEffect(() => {
        if (companyName) {
            const dummyCompanies = ['pertineo', '삼성전자', 'LG전자', '현대자동차', '네이버', '카카오', '쿠팡', '배달의민족'];
            setCompanyResults(dummyCompanies.filter(c => c.toLowerCase().includes(companyName.toLowerCase())));
        } else {
            setCompanyResults([]);
        }
    }, [companyName]);

    useEffect(() => {
        if (jobTitle) {
            const dummyJobs = ['소프트웨어 엔지니어', '프론트엔드 개발자', '백엔드 개발자', '서비스 기획자', 'UI/UX 디자이너', '데이터 사이언티스트', 'DevOps 엔지니어'];
            setJobTitleResults(dummyJobs.filter(j => j.includes(jobTitle)));
        } else {
            setJobTitleResults([]);
        }
    }, [jobTitle]);

    return (
        <div className="overflow-y-auto flex flex-col items-center gap-[100px] max-[893px]:gap-[40px] mt-[38px] max-[893px]:mt-[34px] mb-[150px]">
            <div className="flex w-full min-[894px]:max-w-[1080px] gap-[20px] max-[893px]:flex-col max-[893px]:max-w-[452px]">
                <EntrySection
                    caption="지원 회사명"
                    value={companyName}
                    onChange={setCompanyName}
                    placeholder="pertineo"
                    width={530}
                    required={true}
                    autocompleteResults={companyResults}
                    className="max-[893px]:!max-w-[452px]"
                />
                <EntrySection
                    caption="지원 직무"
                    value={jobTitle}
                    onChange={setJobTitle}
                    placeholder="소프트웨어 엔지니어"
                    width={530}
                    required={true}
                    autocompleteResults={jobTitleResults}
                    className="max-[893px]:!max-w-[452px]"
                />
            </div>

            <EntrySection
                caption="지원 공고 사이트 URL"
                value={noticeUrl}
                onChange={setNoticeUrl}
                placeholder="https://pertineo.khu.ac.kr/"
                width={1080}
                className="max-[893px]:!max-w-[452px]"
            />

            <div className="mt-[20px] max-[893px]:mt-[30px] flex gap-[12px] max-[893px]:gap-[7px] items-center">
                <Button
                    variant="secondary"
                    onClick={() => {
                        // TODO: 임시저장 로직 구현
                    }}
                >
                    임시저장
                </Button>
                <Button onClick={() => navigate('/input-page/resume')}>
                    다음
                </Button>
            </div>
        </div>
    );
}

export default CompanySection;
