import React from "react";
import styles from "./PrivacyPolicy.module.scss";
import GoToMainButton from "components/shared/goToMainButton";

function PrivacyPolicy() {
  return (
    <div className={styles.privacyPolicy}>
      <div className={styles.wrapper}>
        <div className={styles.title}>개인정보처리방침</div>
        <div className={styles.content}>
          <h2>1. 총칙</h2>
          <p>
            1.1. 본 방침은 "PERTINEO"(이하 "회사")가 제공하는 서비스 이용 시 이용자의 개인정보를 보호하기 위한 원칙과 조치 사항을 규정합니다.
          </p>
          <p>
            1.2. 회사는 개인정보 보호법 등 관련 법령을 준수하며, 최소한의 정보만을 수집하고 안전하게 처리합니다.
          </p>
          <p>
            1.3. 본 방침은 서비스의 이용약관과 함께 적용되며, 이용자가 서비스를 이용하는 경우 본 방침에 동의한 것으로
            간주됩니다.
          </p>

          <h2>2. 수집 항목 및 목적</h2>
          <p>2.1. 수집 항목</p>
          <ul>
            <li>
              <strong>필수 정보:</strong> 이메일 주소, 분석 이용 횟수
            </li>
          </ul>
          <p>2.2. 이용 목적</p>
          <ul>
            <li>
              이용자 식별 및 이용횟수 관리
            </li>
            <li>
              서비스 운영 및 품질 개선을 위한 분석
            </li>
          </ul>
          <p>
            2.3. 회사는 자소서, 포트폴리오, 이력서 등 사용자의 입력 데이터를 서버에 저장하지 않으며, 실시간으로 처리 후 즉시 폐기합니다.
          </p>

          <h2>3. 보유 및 이용 기간</h2>
          <ul>
            <li>
              이메일과 이용 횟수 정보는 회원 탈퇴 또는 서비스 종료 요청 시 즉시 삭제됩니다.
            </li>
            <li>
              관련 법령에 따라 별도로 보존해야 하는 경우는 해당 법령에 따릅니다.
            </li>
          </ul>

          <h2>4. 제3자 제공 및 위탁</h2>
          <ul>
            <li>
              회사는 이용자의 개인정보를 외부에 제공하거나 위탁하지 않습니다.
            </li>
            <li>
              단, 법적 요청이나 비식별 통계 목적의 활용이 필요한 경우, 이용자의 동의를 받아 제한적으로 제공할 수 있습니다.
            </li>
          </ul>


          <h2>5. 이용자의 권리</h2>
          <ul>
            <li>
              이용자는 언제든지 자신의 개인정보(이메일 등)에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.
            </li>
            <li>
              요청은 이메일 또는 문의 채널을 통해 접수할 수 있으며, 회사는 지체 없이 처리합니다.
            </li>
          </ul>

          <h2>6. 개인정보 보호책임자</h2>
          <ul>
            <li>
              <strong>성명:</strong> 김양수
            </li>
            <li>
              <strong>직책:</strong> 미래인재센터 오픈랩 담당교수
            </li>
            <li>
              <strong>연락처:</strong> 010-2718-6415
            </li>
          </ul>
          <p>
            6.2. 전문가들의 권고에 따라, 보안 위협 분석 및 모의 침투 테스트를 주기적으로 실시하여 최신 보안 위협에
            대응하고 있습니다.
          </p>

          <h2>7. 방침 변경</h2>
          <ul>
            <li>
              본 방침은 법령 및 내부 정책에 따라 변경될 수 있으며, 변경 시 홈페이지 또는 서비스 내 공지를 통해 안내합니다.
            </li>
          </ul>
        </div>
      </div>
      <GoToMainButton />
    </div>
  );
}

export default PrivacyPolicy;
