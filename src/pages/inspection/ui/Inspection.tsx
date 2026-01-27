import React from "react";

function Inspection() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-900 mb-4">
          시스템 점검 중입니다
        </h1>
        <p className="text-gray-600 leading-relaxed mb-6">
          보다 나은 서비스를 위해 시스템 점검을 진행하고 있습니다.
          <br />
          빠른 시간 내에 정상적인 서비스가 가능하도록 최선을 다하겠습니다.
        </p>
        <div className="border-t border-gray-200 pt-4">
          <p className="text-sm text-gray-400">
            불편을 드려 죄송합니다. 감사합니다.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inspection;
