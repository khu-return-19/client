import { useState, useEffect, useRef, useCallback } from "react";
import CompleteIcon from "../components/CompleteIcon";
import CircularProgressBar from "../components/CircularProgressBar";
import "../components/loading.css";

function UrlItem({ url, hostname, animated = true }) {
  const faviconSrc = `https://www.google.com/s2/favicons?domain=${hostname}&sz=32`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-[8px] mt-[6px] w-fit whitespace-nowrap${animated ? " animate-slide-up" : ""}`}
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

function AnalysisStateSection({ completed, error, title, completedTitle, items, expectedDuration, showCompletedItems = true }) {
  const sectionRef = useRef(null);
  const [progressFull, setProgressFull] = useState(false);
  const [urlExpanded, setUrlExpanded] = useState(false);

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

        {/* 진행 중: 최근 2개 fade-in 컨베이어 / 완료 후: showCompletedItems=true일 때만 전체 slide-up */}
        {!showCompleteIcon
          ? textItems.slice(-2).map((item, i) => (
              <p
                key={item.value + "-" + i}
                className="mt-[6px] text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400] animate-fade-in"
              >
                {item.value}
              </p>
            ))
          : showCompletedItems && textItems.map((item, index) => (
              <div key={item.value + index} className="mt-[6px] min-w-0 animate-slide-up">
                <p className="text-[16px] max-[893px]:text-[14px] text-[#717171] font-[400] break-keep">
                  {item.value}
                </p>
              </div>
            ))
        }

        {/* URL 항목 */}
        {urlItems.length > 0 && (
          <div>
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
                    {!urlExpanded && urlItems.length > 1 && ` 외 ${urlItems.length - 1}개 검색 완료`}
                    {urlExpanded ? " ⏶" : " ⏷"}
                  </span>
                </button>
                {urlExpanded && (
                  <div className="mt-[2px]">
                    {urlItems.slice(1).map((item) => (
                      <UrlItem key={item.url} url={item.url} hostname={item.hostname} animated={false} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* 진행 중: 최근 2개 컨베이어 — key에 슬라이스 인덱스 포함해 이동 시 재애니메이션 */
              <div className="overflow-hidden">
                {urlItems.slice(-2).map((item, i) => (
                  <UrlItem key={item.url + "-" + i} url={item.url} hostname={item.hostname} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisStateSection;
