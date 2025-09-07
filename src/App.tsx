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
    experiencias: [],
  });

  // Função auxiliar para formatar data
  const formatarDataPDF = (data: string): string => {
    if (!data) return "";
    const [ano, mes] = data.split("-");
    const meses = [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out",
      "Nov",
      "Dez",
    ];
    const idx = parseInt(mes, 10) - 1;
    if (isNaN(idx) || idx < 0 || idx > 11) return ano || data;
    return `${meses[idx]}/${ano}`;
  };

  // Função de exportar PDF estilizado (sem spread para evitar TS2556)
  const exportPDF = () => {
    const pdf = new jsPDF();

    // Cores (RGB)
    const primaryColor: [number, number, number] = [41, 128, 185]; // azul
    const secondaryColor: [number, number, number] = [44, 62, 80]; // cinza escuro

    // Cabeçalho
    pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.rect(0, 0, 210, 40, "F"); // barra azul no topo

    pdf.setFontSize(20);
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.text(curriculo.nome || "Seu Nome Completo", 20, 25);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `${curriculo.email || "seu.email@exemplo.com"} | ${
        curriculo.telefone || "(00) 00000-0000"
      } | ${curriculo.linkedin || "LinkedIn"}`,
      20,
      35
    );

    // Seção Habilidades
    let y = 55;
    pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("Habilidades", 20, y);

    y += 8;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    const habilidadesTexto =
      curriculo.habilidades.length > 0
        ? "• " + curriculo.habilidades.join("\n• ")
        : "Lista de habilidades";
    const habilidadesSplit = pdf.splitTextToSize(habilidadesTexto, 170);
    pdf.text(habilidadesSplit, 20, y);
    y += habilidadesSplit.length * 6 + 10;

    // Seção Experiência Profissional
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(14);
    pdf.text("Experiência Profissional", 20, y);

    y += 10;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);

    if (curriculo.experiencias.length > 0) {
      curriculo.experiencias.forEach((exp, index) => {
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }

        // Cargo e empresa
        pdf.setFont("helvetica", "bold");
        pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.text(`${exp.cargo} - ${exp.empresa}`, 20, y);
        y += 6;

        // Período
        pdf.setFont("helvetica", "italic");
        pdf.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
        const inicioFmt = formatarDataPDF(exp.dataInicio);
        const fimFmt = formatarDataPDF(exp.dataFim) || "Atual";
        pdf.text(`${inicioFmt} - ${fimFmt}`, 20, y);
        y += 6;

        // Descrição
        pdf.setFont("helvetica", "normal");
        pdf.setTextColor(0, 0, 0);
        const descSplit = pdf.splitTextToSize(exp.descricao || "", 170);
        pdf.text(descSplit, 20, y);
        y += descSplit.length * 6 + 8;

        // Linha divisória
        if (index < curriculo.experiencias.length - 1) {
          pdf.setDrawColor(200);
          pdf.line(20, y, 190, y);
          y += 8;
        }
      });
    } else {
      pdf.text("Nenhuma experiência cadastrada", 20, y);
    }

    pdf.save("curriculo.pdf");
  };

  const handleChange = (
    campo: string,
    valor: string | string[] | Experiencia[]
  ) => {
    setCurriculo((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  return (
    <>
      <Header onExportPDF={exportPDF} />
      <div className="container">
        <div className="form-section">
          <DadosPessoais onChange={handleChange} dados={curriculo} />
        </div>
        <div className="preview-section">
          <Preview dados={curriculo} />
        </div>
      </div>
    </>
  );
}

export default App;