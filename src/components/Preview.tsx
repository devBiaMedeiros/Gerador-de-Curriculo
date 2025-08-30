import { Briefcase, Mail, Phone, Wrench, LinkedinIcon } from "lucide-react";
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
      <div className="preview-content">
        <div className="preview-data">
          <h2>{dados.nome || "Seu Nome Completo"}</h2>
          <div className="preview-data-info">
            <p><Mail size={16}/> {dados.email  || "seu.email@exemplo.com"}</p>
            <p><Phone size={16}/> {dados.telefone || "(00) 00000-0000"}</p>
            <p><LinkedinIcon size={16}/> {dados.linkedin || "LinkedIn"}</p>
          </div>
        </div>
        <hr className="separator"/>
        <h3> <Wrench/> Habilidades</h3>
        <p>{dados.habilidades || "Suas habilidades aparecerão aqui conforme você adiciona..."}</p>
        <h3> <Briefcase /> Experiência</h3>
        <p>{dados.experiencia || "Suas experiências profissionais aparecerão aqui conforme você adiciona..."}</p>
      </div>
    </div>
  );
}
