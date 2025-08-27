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
  return (
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
  );
}