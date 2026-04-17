import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import EntrySection from "../components/EntrySection";
import Button from "../../components/Button";
import TempSaveModal from "../../components/TempSaveModal";
import { useFetchCompanies, useFetchPositions } from "api/setupApi";

function CompanySection() {
    const navigate = useNavigate();
    const [showTempSaveModal, setShowTempSaveModal] = useState(false);

    // API 자동완성 데이터
    const { data: companiesData } = useFetchCompanies();
    const { data: positionsData } = useFetchPositions();

    const companiesList = useMemo(() => companiesData?.data?.list ?? [], [companiesData]);
    const positionsList = useMemo(() => positionsData?.data?.list ?? [], [positionsData]);

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

    // 3. 필터링 로직
    useEffect(() => {
        if (companyName) {
            setCompanyResults(companiesList.filter(c => c.toLowerCase().includes(companyName.toLowerCase())));
        } else {
            setCompanyResults(companiesList);
        }
    }, [companyName, companiesList]);

    useEffect(() => {
        if (jobTitle) {
            setJobTitleResults(positionsList.filter(j => j.toLowerCase().includes(jobTitle.toLowerCase())));
        } else {
            setJobTitleResults(positionsList);
        }
    }, [jobTitle, positionsList]);

    const canProceed = companyName.trim() !== '' && jobTitle.trim() !== '';

    return (
        <div className="overflow-y-auto flex flex-col items-center gap-[100px] max-[893px]:gap-[40px] mt-[38px] max-[893px]:mt-[34px] mb-[150px]">
            {showTempSaveModal && <TempSaveModal onClose={() => setShowTempSaveModal(false)} />}
            <div className="flex w-full min-[894px]:max-w-[1080px] gap-[20px] max-[893px]:flex-col">
                <EntrySection
                    caption="지원 회사명"
                    value={companyName}
                    onChange={setCompanyName}
                    placeholder="pertineo"
                    width={530}
                    required={true}
                    autocompleteResults={companyResults}

                />
                <EntrySection
                    caption="지원 직무"
                    value={jobTitle}
                    onChange={setJobTitle}
                    placeholder="소프트웨어 엔지니어"
                    width={530}
                    required={true}
                    autocompleteResults={positionsList}
                    selectOnly={true}
                />
            </div>

            <EntrySection
                caption="지원 공고 사이트 URL"
                value={noticeUrl}
                onChange={setNoticeUrl}
                placeholder="https://pertineo.khu.ac.kr/"
                width={1080}
            />

            <div className="mt-[20px] max-[893px]:mt-[30px] flex gap-[12px] max-[893px]:gap-[7px] items-center">
                <Button
                    variant="secondary"
                    onClick={() => setShowTempSaveModal(true)}
                >
                    임시저장
                </Button>
                <Button
                    status={canProceed ? 'default' : 'disabled'}
                    onClick={() => navigate('/input-page/resume')}
                >
                    다음
                </Button>
            </div>
        </div>
    );

}

export default CompanySection;
