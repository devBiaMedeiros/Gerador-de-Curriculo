import { useState } from "react";
import Header from "./components/Header"; 
import DadosPessoais from "./components/DadosPessoais";
import Preview from "./components/Preview";
import { jsPDF } from "jspdf";
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
    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text(curriculo.nome || "Seu Nome Completo", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Email: ${curriculo.email || "seu.email@exemplo.com"}`, 20, 30);
    pdf.text(`Telefone: ${curriculo.telefone || "(00) 00000-0000"}`, 20, 40);
    pdf.text(`LinkedIn: ${curriculo.linkedin || "LinkedIn"}`, 20, 50);

    pdf.setFontSize(16);
    pdf.text("Habilidades", 20, 70);
    pdf.setFontSize(12);
    pdf.text(curriculo.habilidades || "Lista de habilidades", 20, 80);

    pdf.setFontSize(16);
    pdf.text("Experiência", 20, 100);
    pdf.setFontSize(12);
    pdf.text(curriculo.experiencia || "Descrição da experiência", 20, 110);

    pdf.save("curriculo.pdf");
  };

  return (
    <>
      <Header onExportPDF={exportPDF} />
      <div className="container">
        <div className="form-section">
          <DadosPessoais onChange={handleChange} />
        </div>
        <div className="preview-section">
          <Preview dados={curriculo} />
        </div>
      </div>
    </>
  );
}

export default App;
