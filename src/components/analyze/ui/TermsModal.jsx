import React from "react";
import styles from "./TermsModal.module.scss";

function TermsModal({ onClose }) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className={styles.modal}>
        <div className={styles.header}>
          <span className={styles.title}>이용약관</span>
          <button className={styles.closeButton} onClick={onClose}>
            ✕
          </button>
        </div>
        <span className={styles.content}>
          <div className={styles.title}>KHU PERTINEO 3D 자소서 역량 평가 서비스 이용약관 (전문)</div>
          <div className={styles.date}>시행일자: 2025년 4월 21일</div>

          <p>
            <strong>제1조 (목적)</strong> 본 약관은 PERTINEO(이하 "운영자")가 제공하는 3D 자기소개서 역량 평가
            서비스(이하 "서비스")의 이용과 관련하여 운영자와 회원 간의 권리, 의무 및 책임사항, 기타 필요한 사항을
            규정함을 목적으로 합니다.
          </p>

          <p>
            <strong>제2조 (용어의 정의)</strong>
          </p>
          <div className={styles.subClause}>
            <p>
              1. "서비스"란 사용자의 입력 데이터를 바탕으로 X축(학습 수준), Y축(직무 적합성), Z축(수행 역량)을 평가하고,
              그 결과를 시각화한 리포트를 제공하는 일체의 기능을 말합니다.
            </p>
            <p>2. "회원"이란 본 약관에 동의하고 서비스를 이용하는 자를 의미합니다.</p>
            <p>
              3. "평가 데이터"란 회원이 입력한 자소서, 이력서, 포트폴리오, 평가 항목 응답 등 서비스 이용에 활용되는
              정보를 의미합니다. (운영자는 이를 저장하지 않음)
            </p>
          </div>

          <p>
            <strong>제3조 (약관의 효력 및 변경)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 본 약관은 서비스 초기화면에 게시하거나 기타의 방법으로 공지함으로써 효력이 발생합니다.</p>
            <p>
              2. 운영자는 관련 법령을 위배하지 않는 범위 내에서 본 약관을 변경할 수 있으며, 변경 시 서비스 내 공지사항
              또는 이메일 등으로 사전 고지합니다.
            </p>
          </div>

          <p>
            <strong>제4조 (서비스의 제공)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 운영자는 회원에게 다음과 같은 서비스를 제공합니다.</p>
            <div className={styles.subClause}>
              <p>(1) 3D 역량 진단 및 피드백 리포트</p>
              <p>(2) 맞춤형 진로/취업/교육 경로 제안</p>
              <p>(3) 포트폴리오 추천 및 성장 가이드</p>
            </div>
            <p>
              2. 서비스는 원칙적으로 연중무휴, 1일 24시간 제공되며, 시스템 점검 등의 사유로 일시 중단될 수 있습니다.
            </p>
          </div>

          <p>
            <strong>제5조 (회원가입 및 자격)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 회원가입은 사용자가 본 약관에 동의하고, 이메일을 통한 간편 등록으로 완료됩니다.</p>
            <p>2. 운영자는 다음의 경우 회원가입을 거부하거나 사후 탈퇴 조치를 취할 수 있습니다</p>
            <div className={styles.subClause}>
              <p>(1) 타인의 정보를 도용하거나 허위정보를 입력한 경우</p>
              <p>(2) 서비스를 악용하거나 정상적인 운영을 방해한 경우</p>
            </div>
          </div>

          <p>
            <strong>제6조 (개인정보의 수집 및 이용)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 운영자는 다음의 개인정보를 수집할 수 있습니다</p>
            <div className={styles.subClause}>
              <p>• 수집 항목: 이메일 주소, 이용 횟수</p>
            </div>
            <p>2. 수집된 개인정보는 다음의 목적에 이용됩니다</p>
            <div className={styles.subClause}>
              <p>• 서비스 제공, 이용횟수 확인</p>
            </div>
            <p>3. 자소서, 이력서 등 입력 데이터는 저장하지 않습니다.</p>
            <p>
              4. 회원은 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으나, 이 경우 일부 서비스 이용이 제한될 수
              있습니다.
            </p>
          </div>

          <p>
            <strong>제7조 (개인정보의 제3자 제공 및 위탁)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 운영자는 원칙적으로 회원의 개인정보를 제3자에게 제공하지 않습니다.</p>
            <p>2. 단, 다음의 경우에는 사전 동의를 받아 최소한의 범위 내에서 제공할 수 있습니다</p>
            <div className={styles.subClause}>
              <p>• 제휴된 취업컨설팅 업체 또는 진단 알고리즘 고도화 목적의 비식별 데이터 제공</p>
              <p>• 리포트 발송, 서버 관리 등 일부 업무의 외부 위탁</p>
            </div>
            <p>3. 위탁업체는 계약에 따라 개인정보를 안전하게 보호할 책임을 가집니다.</p>
          </div>

          <p>
            <strong>제8조 (회원의 권리와 의무)</strong>
          </p>
          <div className={styles.subClause}>
            <p>
              1. 회원은 자신의 정보를 항상 정확하게 유지하여야 하며, 계정정보를 제3자에게 공유하거나 도용당하지 않도록
              주의할 책임이 있습니다.
            </p>
            <p>
              2. 회원은 서비스 내 평가 결과를 본인 외 제3자에게 공개할 수 있으나, 리포트 원문을 무단 도용하거나 상업적
              이용할 수 없습니다.
            </p>
            <p>3. 회원은 서비스를 통해 제공된 리포트를 자신의 진로설계 및 구직 활동에 자유롭게 활용할 수 있습니다.</p>
          </div>

          <p>
            <strong>제9조 (저작권 및 데이터 활용 동의)</strong>
          </p>
          <div className={styles.subClause}>
            <p>1. 입력 데이터는 저장되지 않으며, 통계용 익명 데이터만 활용될 수 있습니다.</p>
          </div>

          <p>
            <strong>제10조 (서비스의 제한 및 종료)</strong>
          </p>
          <div className={styles.subClause}>
            <p>
              1. 운영자는 시스템 점검, 보안 강화, 기술 업그레이드 등의 사유로 서비스를 일시 중단하거나 종료할 수
              있습니다.
            </p>
            <p>2. 중단 시 사전 공지를 원칙으로 하며, 긴급한 경우 사후 통지할 수 있습니다.</p>
          </div>

          <p>
            <strong>제11조 (면책조항)</strong>
          </p>
          <div className={styles.subClause}>
            <p>
              1. 서비스에서 제공되는 평가 결과는 진단을 위한 참고자료이며, 최종적인 채용, 선발, 학업 결과를 보장하지
              않습니다.
            </p>
            <p>
              2. 회원이 제공한 정보의 정확성 부족, 시스템 오류 등으로 인해 발생한 결과에 대해서는 운영자가 책임지지
              않습니다.
            </p>
          </div>

          <p>
            <strong>제12조 (분쟁 해결)</strong> 본 약관에 관한 분쟁은 대한민국 법률에 따라 해결하며, 분쟁 발생 시
            관할법원은 운영자 소재지 관할 법원으로 합니다.
          </p>

          <p>
            <strong>부칙</strong>: 본 약관은 2025년 4월 13일부터 시행합니다.
          </p>
        </span>
      </div>
    </div>
  );
}

export default TermsModal;
