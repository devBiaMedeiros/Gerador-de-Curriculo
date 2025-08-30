import "./styles/List.css";
import { useState } from 'react';
import { Briefcase, Plus, Trash2, Calendar } from 'lucide-react';
import MelhoriaIA from './MelhoriaIA';

interface Experiencia {
  id: string;
  empresa: string;
  cargo: string;
  dataInicio: string;
  dataFim: string;
  descricao: string;
}

type Props = {
  onChange: (campo: string, valor: Experiencia[]) => void;
  experiencias?: Experiencia[];
};

export default function ExperienciaProfissional({ onChange, experiencias = [] }: Props) {
  const [novaExperiencia, setNovaExperiencia] = useState({
    empresa: '',
    cargo: '',
    dataInicio: '',
    dataFim: '',
    descricao: '',
    atual: false
  });

  const adicionarExperiencia = () => {
    if (novaExperiencia.empresa.trim() && novaExperiencia.cargo.trim()) {
      const experiencia: Experiencia = {
        id: Date.now().toString(),
        empresa: novaExperiencia.empresa.trim(),
        cargo: novaExperiencia.cargo.trim(),
        dataInicio: novaExperiencia.dataInicio,
        dataFim: novaExperiencia.atual ? 'Atual' : novaExperiencia.dataFim,
        descricao: novaExperiencia.descricao.trim()
      };

      const novasExperiencias = [...experiencias, experiencia];
      onChange("experiencias", novasExperiencias);
      
      // Reset form
      setNovaExperiencia({
        empresa: '',
        cargo: '',
        dataInicio: '',
        dataFim: '',
        descricao: '',
        atual: false
      });
    }
  };

  const removerExperiencia = (id: string) => {
    const novasExperiencias = experiencias.filter(exp => exp.id !== id);
    onChange("experiencias", novasExperiencias);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setNovaExperiencia(prev => ({
      ...prev,
      atual: checked,
      dataFim: checked ? '' : prev.dataFim
    }));
  };

  // Função para quando a IA melhorar a descrição
  const handleDescricaoMelhorada = (descricaoMelhorada: string) => {
    setNovaExperiencia(prev => ({
      ...prev,
      descricao: descricaoMelhorada
    }));
  };

  return (
    <div>
      <h3><Briefcase /> Experiência Profissional</h3>
      
      <div style={{ marginBottom: '1rem' }}>
        {/* Formulário para nova experiência */}
        <div className="list-background">
          <h4 className="list-title">Adicionar Experiência</h4>
          
          <div className="list-grid">
            <input
              type="text"
              placeholder="Nome da Empresa"
              value={novaExperiencia.empresa}
              onChange={(e) => setNovaExperiencia(prev => ({ ...prev, empresa: e.target.value }))}
            />
            
            <input
              type="text"
              placeholder="Cargo/Posição"
              value={novaExperiencia.cargo}
              onChange={(e) => setNovaExperiencia(prev => ({ ...prev, cargo: e.target.value }))}
            />
            
            <div className="list-grid-date">
              <div className="list-grid-date-item">
                <label className="list-grid-date-item">
                  <Calendar size={14} /> Data de Início
                </label>
                <input
                  type="month"
                  value={novaExperiencia.dataInicio}
                  onChange={(e) => setNovaExperiencia(prev => ({ ...prev, dataInicio: e.target.value }))}
                  className="list-grid-date-item"
                />
              </div>
              
              <div className="list-grid-date-item">
                <label className="list-grid-date-item">
                  <Calendar size={14} /> Data de Término
                </label>
                {!novaExperiencia.atual ? (
                  <input
                    type="month"
                    value={novaExperiencia.dataFim}
                    onChange={(e) => setNovaExperiencia(prev => ({ ...prev, dataFim: e.target.value }))}
                    className="list-grid-date-item"
                    disabled={novaExperiencia.atual}
                  />
                ) : (
                  <input
                    type="text"
                    value="Atual"
                    disabled
                    className="list-grid-date-item"
                  />
                )}
              </div>
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <input
                type="checkbox"
                checked={novaExperiencia.atual}
                onChange={(e) => handleCheckboxChange(e.target.checked)}
              />
              <span>Trabalho atualmente aqui</span>
            </label>
            
            <div>
              <textarea
                placeholder="Descrição das atividades (opcional)"
                value={novaExperiencia.descricao}
                onChange={(e) => setNovaExperiencia(prev => ({ ...prev, descricao: e.target.value }))}
                rows={3}
                style={{ padding: '0.5rem', resize: 'vertical', width: '100%' }}
              />
              
              {/* BOTÃO DE MELHORIA IA PARA DESCRIÇÃO - ADICIONE AQUI */}
              <MelhoriaIA 
                texto={novaExperiencia.descricao}
                onTextoMelhorado={handleDescricaoMelhorada}
                tipo="experiencia"
              />
            </div>
            
            <button 
              onClick={adicionarExperiencia}
              className='list-btn-add'
            >
              <Plus size={16} />
              Adicionar Experiência
            </button>
          </div>
        </div>

        {/* Lista de experiências */}
        <div>
          {experiencias.map((experiencia) => (
            <div 
              key={experiencia.id}
              style={{ 
                padding: '1rem', 
                background: 'white', 
                marginBottom: '1rem', 
                borderRadius: '8px',
                border: '1px solid #dee2e6',
                position: 'relative'
              }}
            >
              <button 
                onClick={() => removerExperiencia(experiencia.id)}
                style={{ 
                  position: 'absolute', 
                  top: '0.5rem', 
                  right: '0.5rem', 
                  background: 'none', 
                  border: 'none', 
                  color: '#dc3545', 
                  cursor: 'pointer' 
                }}
              >
                <Trash2 size={14} />
              </button>
              
              <h4 style={{ margin: '0 0 0.5rem 0', color: '#25034b' }}>
                {experiencia.cargo}
              </h4>
              
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: '#495057' }}>
                {experiencia.empresa}
              </p>
              
              <p style={{ margin: '0 0 0.5rem 0', color: '#6c757d', fontSize: '0.875rem' }}>
                {formatarData(experiencia.dataInicio)} - {experiencia.dataFim}
              </p>
              
              {experiencia.descricao && (
                <p style={{ margin: 0, color: '#495057', fontSize: '0.9rem' }}>
                  {experiencia.descricao}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Função auxiliar para formatar data
function formatarData(data: string): string {
  if (!data) return '';
  
  const [ano, mes] = data.split('-');
  const meses = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];
  
  return `${meses[parseInt(mes) - 1]}/${ano}`;
}