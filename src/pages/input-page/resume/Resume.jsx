import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputPageLayout from "../layouts/InputPageLayout";
import EntryGroupSection from "../components/EntryGroupSection";
import Button from "../components/Button";

// 어학 종류 리스트
const LANGUAGES_MASTER = [
  'TOEIC', 'TEPS', 'G-TELP', 'TOSEL',
  'OPIc', 'TOEIC Speaking', 'TEPS Speaking', 'G-TELP Speaking',
  'TOEFL', 'IELTS', 'PTE Academic', 'Duolingo English Test',
  'GRE', 'GMAT', 'FCE', 'CAE', 'CPE',
  'HSK', 'HSKK', 'BCT', 'TSC', 'CPT', 'TOCFL',
  'JLPT', 'JPT', 'SJPT', 'BJT',
  'Goethe-Zertifikat', 'TestDaF', 'DSH',
  'DELF', 'DALF', 'TCF', 'TEF',
  'DELE', 'FLEX',
  'TORFL', 'SNULT',
  'OPI', 'VPT',
  'TOPIK', 'KBS한국어능력시험', 'ToKL',
  'CELI', 'CILS', 'Celpe-Bras',
  'ITT', 'TCT'
];

// 기타 더미 데이터
const MAJORS_DUMMY = ['컴퓨터공학', '전자공학', '산업경영공학', '기계공학', '소프트웨어융합', '데이터사이언스', '경영학', '경제학', '시각디자인', '언론정보학'];
const COMPANIES_DUMMY = ['pertineo', '삼성전자', '현대자동차', '네이버', '카카오', '쿠팡', '우아한형제들'];
const POSITIONS_DUMMY = ['신입', '인턴', '주임', '대리', '과장', '팀장', '프론트엔드 엔지니어', '백엔드 엔지니어', '풀스택 엔지니어', '기획자', '디자이너'];
const UNIVERSITIES_DUMMY = ['경희대학교', '서울대학교', '연세대학교', '고려대학교', '성균관대학교', '한양대학교', '서강대학교', '중앙대학교', '한국외국어대학교', '시립대학교'];

function Resume() {
  const navigate = useNavigate();

  // 1. 상태 정의
  const [education, setEducation] = useState([{ university: '경희대학교', major: '', gpa: '', minor: '' }]);
  const [experience, setExperience] = useState([{ type: '', period: '', company: '', department: '', position: '' }]);
  const [awards, setAwards] = useState([{ name: '', issuer: '' }]);
  const [certifications, setCertifications] = useState([{ type: '', date: '' }]);
  const [languages, setLanguages] = useState([{ type: '', score: '' }]);

  // 2. 자동완성용 결과 상태
  const [autocompleteResults, setAutocompleteResults] = useState({
    university: [],
    major: [],
    minor: [],
    company: [],
    position: [],
    langType: []
  });

  // 3. 필터링 로직
  const filterResults = (key, value, dummyList) => {
    if (!value) return [];
    return dummyList.filter(item => item.toLowerCase().includes(value.toLowerCase()));
  };

  // 행 변경 핸들러 (자동완성 트리거용)
  const handleEduChange = (newItems) => {
    setEducation(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults(prev => ({
      ...prev,
      university: filterResults('university', last.university, UNIVERSITIES_DUMMY),
      major: filterResults('major', last.major, MAJORS_DUMMY),
      minor: filterResults('minor', last.minor, MAJORS_DUMMY)
    }));
  };

  const handleExpChange = (newItems) => {
    setExperience(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults(prev => ({
      ...prev,
      company: filterResults('company', last.company, COMPANIES_DUMMY),
      position: filterResults('position', last.position, POSITIONS_DUMMY)
    }));
  };

  const handleLangChange = (newItems) => {
    setLanguages(newItems);
    const last = newItems[newItems.length - 1];
    setAutocompleteResults(prev => ({
      ...prev,
      langType: filterResults('type', last.type, LANGUAGES_MASTER)
    }));
  };

  return (
    <InputPageLayout>
      <div className="overflow-y-auto flex flex-col items-center gap-[100px] py-[60px] mt-[12px]">
        {/* 학력사항 */}
        <EntryGroupSection
          caption="학력사항"
          items={education}
          onChange={handleEduChange}
          required={true}
          newItem={{ university: '경희대학교', major: '', gpa: '', minor: '' }}
          placeholders={{
            university: '대학교명',
            major: '전공',
            gpa: '학점 (4.3기준)',
            minor: '부전공'
          }}
          autocompleteResults={{
            university: autocompleteResults.university,
            major: autocompleteResults.major,
            minor: autocompleteResults.minor
          }}
        />

        {/* 경력사항 */}
        <EntryGroupSection
          caption="경력사항"
          items={experience}
          onChange={handleExpChange}
          placeholders={{
            type: '고용 형태',
            period: '기간',
            company: '회사명',
            department: '부서명',
            position: '직책'
          }}
          autocompleteResults={{
            company: autocompleteResults.company,
            position: autocompleteResults.position
          }}
        />

        {/* 수상실적 */}
        <EntryGroupSection
          caption="수상실적"
          items={awards}
          onChange={setAwards}
          placeholders={{
            name: '수상 이름',
            issuer: '발급처'
          }}
        />

        {/* 자격사항 */}
        <EntryGroupSection
          caption="자격사항"
          items={certifications}
          onChange={setCertifications}
          placeholders={{
            type: '자격 종류',
            date: '발급일'
          }}
        />

        {/* 어학사항 */}
        <EntryGroupSection
          caption="어학사항"
          items={languages}
          onChange={handleLangChange}
          placeholders={{
            type: '어학 종류',
            score: '등급/점수'
          }}
          autocompleteResults={{
            type: autocompleteResults.langType
          }}
        />

        {/* 다음 단계 버튼 */}
        <div className="mt-[20px] flex gap-[12px] items-center">
          <Button
            variant="secondary"
            onClick={() => {
              // TODO: 임시저장 로직 구현
            }}
          >
            임시저장
          </Button>
          <Button onClick={() => navigate('/input-page/self-intro')}>
            다음
          </Button>
        </div>
      </div>
    </InputPageLayout>
  );
}

export default Resume;
