import "./styles/Header.css";

type HeaderProps = {
  onExportPDF: () => void;
};

export default function Header({ onExportPDF }: HeaderProps) {
  return (
    <div className="top-header">
      <div className="top-header-left">
        <span className="project-title">
          <strong>Gerador de Currículos <span className="ai-title"></span></strong>
        </span>
        {/* <span className="project-desc">
          Gerar Inteligentemente seu Currículo
        </span> */}
      </div>
      <button className="export-btn" onClick={onExportPDF}>
        Exportar PDF
      </button>
    </div>
  );
}
