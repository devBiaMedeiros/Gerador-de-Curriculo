import { Briefcase, Mail, Phone, Wrench, LinkedinIcon, Calendar } from "lucide-react";
import HeaderContent from "./HeaderContent";

// Interface correta - NOTE QUE AGORA É "experiencias" (plural)
interface DadosCurriculo {
  nome: string;
  email: string;
  telefone: string;
  linkedin: string;
  habilidades: string[];
  experiencias: Experiencia[]; // ← MUDEI para "experiencias" (array)
}

interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

type Props = {
  dados: DadosCurriculo;
};

// Função auxiliar para formatar data no preview também
const formatarDataPreview = (data: string): string => {
  if (!data) return '';
  if (data === 'Atual') return 'Atual';
  
  const [ano, mes] = data.split('-');
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  return `${meses[parseInt(mes) - 1]}/${ano}`;
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
            <p><Mail size={16}/> {dados.email || "seu.email@exemplo.com"}</p>
            <p><Phone size={16}/> {dados.telefone || "(00) 00000-0000"}</p>
            <p><LinkedinIcon size={16}/> {dados.linkedin || "LinkedIn"}</p>
          </div>
        </div>
        <hr className="separator"/>
        
        <h3><Wrench /> Habilidades</h3>
        {dados.habilidades && dados.habilidades.length > 0 ? (
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {dados.habilidades.map((habilidade, index) => (
              <li key={index}>{habilidade}</li>
            ))}
          </ul>
        ) : (
          <p>Suas habilidades aparecerão aqui conforme você adiciona...</p>
        )}
        
        <h3><Briefcase /> Experiência Profissional</h3>
        
        {/* MUDEI COMPLETAMENTE AQUI - AGORA É UM ARRAY */}
        {dados.experiencias && dados.experiencias.length > 0 ? (
          <div>
            {dados.experiencias.map((experiencia, index) => (
              <div key={experiencia.id || index} style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#25034b' }}>
                  {experiencia.cargo}
                </h4>
                <p style={{ margin: '0 0 0.25rem 0', fontWeight: 'bold' }}>
                  {experiencia.empresa}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.9rem' }}>
                  <Calendar size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} />
                  {formatarDataPreview(experiencia.dataInicio)} - {experiencia.dataFim}
                </p>
                {experiencia.descricao && (
                  <p style={{ margin: 0, fontSize: '0.95rem' }}>
                    {experiencia.descricao}
                  </p>
                )}
                {index < dados.experiencias.length - 1 && (
                  <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid #dee2e6' }} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Suas experiências profissionais aparecerão aqui conforme você adiciona...</p>
        )}
      </div>
      <div>
         <a
        className="export-btn"
        href="https://www.linkedin.com/sharing/share-offsite/?url=https://seusite.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: "8px" }}>
        <span style={{ fontSize: "1.3rem" }}>🔗</span> Compartilhar LinkedIn
      </a>
      </div>
      

    </div>
  );
}