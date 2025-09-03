import "./styles/Header.css";
import { LucideBolt, LucideBot, LucideFileUser, LucideWandSparkles } from "lucide-react";

type HeaderProps = {
  onExportPDF: () => void;
};

export default function Header({ onExportPDF }: HeaderProps) {
  return (
    <div className="top-header">
      <div className="top-header-left">
        <span className="project-title">
          <strong> Gerador de Currículos <span className="ai-title"></span></strong>
        </span>
        <span className="project-desc"> <LucideBot /> 
         Gerar Inteligentemente seu Currículo 
        </span>
      </div>
      <button className="export-btn" onClick={onExportPDF}>
        <LucideFileUser /> Exportar PDF
      </button>
       
    </div>
  );
}
