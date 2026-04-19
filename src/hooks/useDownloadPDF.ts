import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function useDownloadPDF() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const download = async () => {
    if (!containerRef.current) return;
    setIsGenerating(true);

    try {
      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>(
          "[data-pdf-section]",
        ),
      );

      const canvases = await Promise.all(
        sections.map((section) =>
          html2canvas(section, {
            scale: 2,
            useCORS: true,
            backgroundColor: "#ffffff",
            width: section.scrollWidth,
            height: section.scrollHeight,
            windowWidth: section.scrollWidth,
          }),
        ),
      );

      let pdf: jsPDF | null = null;

      for (let i = 0; i < canvases.length; i++) {
        const canvas = canvases[i];
        const imgData = canvas.toDataURL("image/jpeg", 0.95);

        if (i === 0) {
          pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
          });
        } else {
          pdf!.addPage([canvas.width, canvas.height]);
        }

        pdf!.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
      }

      pdf!.save("역량평가_리포트.pdf");
    } finally {
      setIsGenerating(false);
    }
  };

  return { containerRef, isGenerating, download };
}
