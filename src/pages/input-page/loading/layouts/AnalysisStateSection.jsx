import { useState, useEffect, useRef, useCallback } from "react";
import CompleteIcon from "../components/CompleteIcon";
import CircularProgressBar from "../components/CircularProgressBar";

function UrlItem({ url, hostname }) {
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-[8px] animate-fade-in mt-[6px] w-fit whitespace-nowrap"
    >
      <img
        src={faviconSrc}
        alt=""
        width={16}
        height={16}
        className="shrink-0 rounded-sm"
        onError={(e) => { e.currentTarget.style.display = "none"; }}
      />
      <span className="text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400]">
        {hostname}
      </span>
    </a>
  );
}

function AnalysisStateSection({ completed, error, title, completedTitle, items, expectedDuration }) {
  const sectionRef = useRef(null);
  const [progressFull, setProgressFull] = useState(false);
  const [urlExpanded, setUrlExpanded] = useState(false);
  const [textExpanded, setTextExpanded] = useState(false);

  const showCompleteIcon = completed && progressFull;
  const displayTitle = showCompleteIcon ? (completedTitle || title) : title;

  const urlItems = items.filter((item) => item.type === "url");
  const textItems = items.filter((item) => item.type === "text");

  useEffect(() => {
    if (sectionRef.current) {
      requestAnimationFrame(() => {
        sectionRef.current.style.opacity = "1";
        sectionRef.current.style.transform = "translateY(0)";
      });
    }
  }, []);

  useEffect(() => {
    if (error) setProgressFull(true);
  }, [error]);

  // completed가 true가 되면 애니메이션 완료 여부와 무관하게 800ms 후 강제 완료 처리
  useEffect(() => {
    if (!completed) return;
    const timer = setTimeout(() => setProgressFull(true), 800);
    return () => clearTimeout(timer);
  }, [completed]);

  const handleFull = useCallback(() => setProgressFull(true), []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex gap-5 transition-all duration-500 ease-out items-start"
      style={{ opacity: 0, transform: "translateY(12px)" }}
    >
      <div className="h-[36px] max-[893px]:h-[24px] flex items-center shrink-0">
        {showCompleteIcon ? (
          <CompleteIcon />
        ) : (
          <CircularProgressBar
            completed={completed}
            error={error}
            expectedDuration={expectedDuration}
            onFull={handleFull}
          />
        )}
      </div>

      <div className="flex flex-col w-full min-w-0">
        <p className="text-[24px] max-[893px]:text-[16px] font-[500] leading-[140%] min-h-[36px] max-[893px]:min-h-[24px] flex items-center">
          {displayTitle}
        </p>

        {/* 텍스트 항목: 한 줄 truncate + ⏷ 인라인 토글 */}
        {textItems.map((item, index) => (
          <div key={item.value + index} className="mt-[6px] min-w-0">
            {textExpanded ? (
              <>
                <p className="text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400] break-keep animate-fade-in">
                  {item.value}
                </p>
                <button
                  onClick={() => setTextExpanded(false)}
                  className="text-[14px] max-[893px]:text-[12px] text-[#717171] font-[400] underline mt-[4px] outline-none"
                >
                  접기 ⏶
                </button>
              </>
            ) : (
              <button
                onClick={() => setTextExpanded(true)}
                className="flex items-center w-full min-w-0 text-left underline outline-none"
              >
                <span className="truncate text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400]">
                  {item.value}
                </span>
                <span className="shrink-0 text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400] ml-[4px]">
                  ⏷
                </span>
              </button>
            )}
          </div>
        ))}

        {/* URL 항목 */}
        {urlItems.length > 0 && (
          <div className="overflow-x-auto">
            {showCompleteIcon ? (
              /* 완료 후: favicon + hostname + 외 N개 검색 완료 ⏷ 전체를 버튼으로 */
              <div className="flex flex-col">
                <button
                  onClick={() => setUrlExpanded((prev) => !prev)}
                  className="flex items-center gap-[8px] mt-[6px] whitespace-nowrap underline text-[#717171] outline-none w-fit"
                >
                  <img
                    src={`https://www.google.com/s2/favicons?domain=${urlItems[0].hostname}&sz=32`}
                    alt=""
                    width={16}
                    height={16}
                    className="shrink-0 rounded-sm"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <span className="text-[16px] max-[893px]:text-[14px] font-[400]">
                    {urlItems[0].hostname}
                    {urlItems.length > 1 && ` 외 ${urlItems.length - 1}개 검색 완료`}
                    {urlExpanded ? " ⏶" : " ⏷"}
                  </span>
                </button>
                {urlExpanded && (
                  <div className="mt-[2px]">
                    {urlItems.slice(1).map((item, index) => (
                      <UrlItem key={item.url + index} url={item.url} hostname={item.hostname} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* 진행 중: 최근 2개 슬라이딩 윈도우 */
              urlItems.slice(-2).map((item, index) => (
                <UrlItem key={item.url + index} url={item.url} hostname={item.hostname} />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisStateSection;
