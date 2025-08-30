import { useState } from "react";
import Header from "./components/Header"; 
import DadosPessoais from "./components/DadosPessoais";
import Preview from "./components/Preview";
import { jsPDF } from "jspdf";
import "./App.css"; 

// Interfaces
interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

interface Curriculo {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  habilidades: string[];
  experiencias: Experiencia[];
}

function App() {
  const [curriculo, setCurriculo] = useState<Curriculo>({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    habilidades: [],
    experiencias: []
  });

  // Função auxiliar para formatar data
  const formatarDataPDF = (data: string): string => {
    if (!data) return '';
    
    const [ano, mes] = data.split('-');
    const meses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];
    
    return `${meses[parseInt(mes) - 1]}/${ano}`;
  };

  const exportPDF = () => {
    const pdf = new jsPDF();
    
    // Dados Pessoais
    pdf.setFontSize(22);
    pdf.text(curriculo.nome || "Seu Nome Completo", 20, 20);
    pdf.setFontSize(12);
    pdf.text(`Email: ${curriculo.email || "seu.email@exemplo.com"}`, 20, 30);
    pdf.text(`Telefone: ${curriculo.telefone || "(00) 00000-0000"}`, 20, 40);
    pdf.text(`LinkedIn: ${curriculo.linkedin || "LinkedIn"}`, 20, 50);
    
    // Habilidades
    pdf.setFontSize(16);
    pdf.text("Habilidades", 20, 70);
    pdf.setFontSize(12);
    const habilidadesTexto = curriculo.habilidades.length > 0 
      ? curriculo.habilidades.join(', ') 
      : "Lista de habilidades";
    const habilidadesSplit = pdf.splitTextToSize(habilidadesTexto, 170);
    pdf.text(habilidadesSplit, 20, 80);
    
    // Experiências
    pdf.setFontSize(16);
    pdf.text("Experiência Profissional", 20, 100);
    pdf.setFontSize(12);
    
    let yPosition = 110;
    
    if (curriculo.experiencias.length > 0) {
      curriculo.experiencias.forEach((experiencia, index) => {
        if (yPosition > 250) {
          pdf.addPage();
          yPosition = 20;
        }
        
        // Empresa e Cargo
        pdf.setFontSize(14);
        pdf.setFont("", 'bold');
        pdf.text(`${experiencia.cargo} - ${experiencia.empresa}`, 20, yPosition);
        yPosition += 7;
        
        // Período
        pdf.setFontSize(12);
        pdf.setFont("", 'normal');
        pdf.text(`Período: ${formatarDataPDF(experiencia.dataInicio)} - ${experiencia.dataFim}`, 20, yPosition);
        yPosition += 7;
        
        // Descrição
        if (experiencia.descricao) {
          const descricaoSplit = pdf.splitTextToSize(experiencia.descricao, 170);
          pdf.text(descricaoSplit, 20, yPosition);
          yPosition += (descricaoSplit.length * 6) + 4;
        }
        
        yPosition += 5;
        
        if (index < curriculo.experiencias.length - 1) {
          pdf.line(20, yPosition, 190, yPosition);
          yPosition += 5;
        }
      });
    } else {
      pdf.text("Nenhuma experiência cadastrada", 20, yPosition);
    }
    
    pdf.save("curriculo.pdf");
  };

  const handleChange = (campo: string, valor: string | string[] | Experiencia[]) => {
    setCurriculo(prev => ({
      ...prev,
      [campo]: valor
    }));
  };

  return (
    <>
      <Header onExportPDF={exportPDF} />
      <div className="container">
        <div className="form-section">
          <DadosPessoais 
            onChange={handleChange} 
            dados={curriculo}
          />
        </div>
        <div className="preview-section">
          <Preview dados={curriculo} />
        </div>
      </div>
    </>
  );
}

export default App;