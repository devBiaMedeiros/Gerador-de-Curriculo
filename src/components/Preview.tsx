import { Briefcase, Mail, Phone, Wrench } from "lucide-react";
import HeaderContent from "./HeaderContent";

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
    <div>
      <HeaderContent
        titulo="Preview do Currículo"
        content="Visualização em tempo real"
        bgColor="#25034b29"
      />
      <div>
        <h2>{dados.nome || "Seu Nome Completo"}</h2>
        <p><Mail/>{dados.email  || "seu.email@exemplo.com"}</p>
        <p> <Phone/> {dados.telefone || "(00) 00000-0000"}</p>
        <p>{dados.linkedin || "LinkedIn"}</p>
        <h3> <Wrench/> Habilidades</h3>
        <p>{dados.habilidades}</p>
        <h3> <Briefcase/> Experiência</h3>
        <p>{dados.experiencia}</p>
      </div>
    </div>
  );
}
