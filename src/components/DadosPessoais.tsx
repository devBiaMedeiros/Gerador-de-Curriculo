import { User } from "lucide-react";
import HeaderContent from "./HeaderContent";
import Habilidades from "./Habilidades";
import ExperienciaProfissional from "./Experiencia";

// 1. Atualize o tipo Props
type Props = {
  onChange: (campo: string, valor: string | string[] | Experiencia[]) => void;
  dados: {
    nome: string;
    email: string;
    telefone: string;
    linkedin: string;
    habilidades: string[];
    experiencias: Experiencia[];
  };
};

// Adicione a interface Experiencia aqui também
interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

export default function DadosPessoais({ onChange, dados }: Props) {
  return (
    <div>
      <HeaderContent 
        titulo="Informações do Currículo" 
        content="Preencha os dados e veja o preview em tempo real" 
        bgColor="#25034b2e"
      />
      <div className="dados-pessoais">
        <h3><User /> Dados Pessoais</h3>
        <input 
          type="text" 
          placeholder="Nome Completo *" 
          value={dados.nome}
          onChange={(e) => onChange("nome", e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email *" 
          value={dados.email}
          onChange={(e) => onChange("email", e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Telefone *" 
          value={dados.telefone}
          onChange={(e) => onChange("telefone", e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="LinkedIn" 
          value={dados.linkedin}
          onChange={(e) => onChange("linkedin", e.target.value)} 
        />
        
        {/* 2. SUBSTITUA o textarea pelo componente Habilidades */}
        <Habilidades 
          onChange={onChange}
          habilidades={dados.habilidades}
        />
        
        <div>
         <ExperienciaProfissional 
            onChange={onChange}
            experiencias={dados.experiencias}
          />
        </div>
      </div>
    </div>
  );
}