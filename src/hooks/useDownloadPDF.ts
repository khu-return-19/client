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
        containerRef.current.querySelectorAll<HTMLElement>("[data-pdf-section]"),
      );

      const pdf = new jsPDF({ orientation: "portrait", unit: "px", format: "a4" });
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < sections.length; i++) {
        const canvas = await html2canvas(sections[i], {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.95);
        const ratio = Math.min(
          pageWidth / canvas.width,
          pageHeight / canvas.height,
        );
        const imgW = canvas.width * ratio;
        const imgH = canvas.height * ratio;
        const x = (pageWidth - imgW) / 2;
        const y = (pageHeight - imgH) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(imgData, "JPEG", x, y, imgW, imgH);
      }

      pdf.save("역량평가_리포트.pdf");
    } finally {
      setIsGenerating(false);
    }
  };

  return { containerRef, isGenerating, download };
}
