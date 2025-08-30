import "./styles/List.css";
import { useState } from 'react';
import { Wrench, Plus, Trash2 } from 'lucide-react';
import MelhoriaIA from './MelhoriaIA';

type Props = {
  onChange: (campo: string, valor: string[]) => void;
  habilidades?: string[];
};

export default function Habilidades({ onChange, habilidades = [] }: Props) {
  const [novaHabilidade, setNovaHabilidade] = useState('');

  const adicionarHabilidade = () => {
    if (novaHabilidade.trim()) {
      const novasHabilidades = [...habilidades, novaHabilidade.trim()];
      onChange("habilidades", novasHabilidades);
      setNovaHabilidade('');
    }
  };

  const removerHabilidade = (index: number) => {
    const novasHabilidades = habilidades.filter((_, i) => i !== index);
    onChange("habilidades", novasHabilidades);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      adicionarHabilidade();
    }
  };

  // Função para quando a IA melhorar o texto
  const handleTextoMelhorado = (textoMelhorado: string) => {
    setNovaHabilidade(textoMelhorado);
  };

  return (
    <div>
      <h3><Wrench /> Habilidades</h3>
      
      <div className='list'>
        <div className='list-add'>
          <input
            type="text"
            placeholder="Digite uma habilidade"
            value={novaHabilidade}
            onChange={(e) => setNovaHabilidade(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button 
            onClick={adicionarHabilidade}
            className='list-btn-add'>
            <Plus size={16} />
          </button>
        </div>

        {/* BOTÃO DE MELHORIA IA - ADICIONE AQUI */}
        <MelhoriaIA 
          texto={novaHabilidade}
          onTextoMelhorado={handleTextoMelhorado}
          tipo="habilidades"
        />

        <div>
          {habilidades.map((habilidade, index) => (
            <div 
              key={index} 
              className='list-item'
            >
              <span>{habilidade}</span>
              <button 
                onClick={() => removerHabilidade(index)}
                className='list-btn-remove'
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}