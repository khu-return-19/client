import React from "react";
import styles from "./AnalysisContentWrapper.module.scss";
import { RadarChart } from "components/analysis";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeRaw from "rehype-raw";
import ShinyText from "components/shared/shiny-text";

function AnalysisContentWrapper({ score, benchmark, streamingContent, currentPhaseText, agentWebSearch }) {
  return (
    <div className={styles.contentWrapper}>
      {benchmark.x !== 0 && (
        <RadarChart
          x={score.x}
          y={score.y}
          z={score.z}
          benchmarkX={benchmark.x}
          benchmarkY={benchmark.y}
          benchmarkZ={benchmark.z}
        />
      )}

      {streamingContent ? (
        <ReactMarkdown
          className={styles.streaming}
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
        >
          {streamingContent}
        </ReactMarkdown>
      ) : (
        <div className={styles.description}>
          <div className={styles.spinner} />
          <ShinyText text={currentPhaseText} speed={3} />

          {agentWebSearch.title && (
            <div className={styles.agentWebSearch}>
              <img src={`http://www.google.com/s2/favicons?domain=${agentWebSearch.url}`} alt="" />
              <span>{agentWebSearch.title}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AnalysisContentWrapper;
