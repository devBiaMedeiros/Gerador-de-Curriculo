import { useState } from "react";
import Header from "./components/Header"; 
import DadosPessoais from "./components/DadosPessoais";
import Habilidades from "./components/Habilidades";
import Experiencia from "./components/Experiencia";
import Preview from "./components/Preview";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import "./App.css"; 

function App() {
  const [curriculo, setCurriculo] = useState({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    habilidades: "",
    experiencia: ""
  });

  const handleChange = (campo: string, valor: string) => {
    setCurriculo({ ...curriculo, [campo]: valor });
  };

  const exportPDF = () => {
    const input = document.getElementById("curriculo-preview");
    if (input) {
      html2canvas(input).then((canvas: HTMLCanvasElement) => {
        const imgWidth = 208; // largura para o pdf A4
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        pdf.save("curriculo.pdf");
      });
    }
  };

  return (
    <>
      <Header onExportPDF={exportPDF} />
      <div className="container">
        <div className="form-section">
          <h2>Informações do Currículo</h2>
          <DadosPessoais onChange={handleChange} />
          <Habilidades onChange={handleChange} />
          <Experiencia onChange={handleChange} />
        </div>
        <div className="preview-section">
          <Preview dados={curriculo} />
        </div>
      </div>
    </>
  );
}

export default App;
