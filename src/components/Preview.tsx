import jsPDF from "jspdf";

type Props = {
  dados: {
    nome: string;
    email: string;
    telefone: string;
    linkedin: string;
    habilidades: string;
    experiencia: string;
  };
};

export default function Preview({ dados }: Props) {
  const exportPDF = () => {
    const pdf = new jsPDF();

    pdf.setFontSize(22);
    pdf.text(dados.nome || "Seu Nome Completo", 20, 20);

    pdf.setFontSize(12);
    pdf.text(`Email: ${dados.email || "seu.email@exemplo.com"}`, 20, 30);
    pdf.text(`Telefone: ${dados.telefone || "(00) 00000-0000"}`, 20, 40);
    pdf.text(`LinkedIn: ${dados.linkedin || "LinkedIn"}`, 20, 50);

    pdf.setFontSize(16);
    pdf.text("Habilidades", 20, 70);
    pdf.setFontSize(12);
    pdf.text(dados.habilidades || "Lista de habilidades", 20, 80);

    pdf.setFontSize(16);
    pdf.text("Experiência", 20, 100);
    pdf.setFontSize(12);
    pdf.text(dados.experiencia || "Descrição da experiência", 20, 110);

    pdf.save("curriculo.pdf");
  };

  return (
    <div>
      <button onClick={exportPDF}>Exportar PDF</button>
      <div style={{ border: "1px solid black", padding: "10px" }}>
        <h2>{dados.nome || "Seu Nome Completo"}</h2>
        <p>{dados.email || "seu.email@exemplo.com"}</p>
        <p>{dados.telefone || "(00) 00000-0000"}</p>
        <p>{dados.linkedin || "LinkedIn"}</p>
        <h3>Habilidades</h3>
        <p>{dados.habilidades}</p>
        <h3>Experiência</h3>
        <p>{dados.experiencia}</p>
      </div>
    </div>
  );
}
