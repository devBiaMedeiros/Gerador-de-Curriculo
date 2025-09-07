// components/MelhoriaIA.tsx
import { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';

interface Props {
  texto: string;
  onTextoMelhorado: (textoMelhorado: string) => void;
  tipo: 'experiencia' | 'habilidades';
}

export default function MelhoriaIA({ texto, onTextoMelhorado, tipo }: Props) {
  const [carregando, setCarregando] = useState(false);

  const melhorarTexto = () => {
    if (!texto.trim()) return;
    
    setCarregando(true);
    
    // Simula um processamento rápido (1 segundo)
    setTimeout(() => {
      const textoMelhorado = simularIA(texto, tipo);
      onTextoMelhorado(textoMelhorado);
      setCarregando(false);
    }, 1000);
  };

  const simularIA = (texto: string, tipo: string): string => {
    if (tipo === 'habilidades') {
      return melhorarHabilidades(texto);
    } else if (tipo === 'experiencia') {
      return melhorarExperiencia(texto);
    } else {
      return texto;
    }
  };

  const melhorarHabilidades = (texto: string): string => {
    // Adiciona habilidades relacionadas automaticamente
    const habilidadesRelacionadas: Record<string, string[]> = {
      'react': ['TypeScript', 'Hooks', 'Context API'],
      'javascript': ['ES6+', 'Async/Await', 'Promises'],
      'html': ['CSS3', 'Semantic HTML', 'Accessibility'],
      'css': ['Flexbox', 'Grid', 'Responsive Design'],
      'python': ['Django', 'Flask', 'Pandas'],
      'java': ['Spring Boot', 'JUnit', 'Maven'],
      'node': ['Express', 'REST APIs', 'NPM'],
      'vue': ['Vuex', 'Vue Router', 'Composition API'],
      'angular': ['RxJS', 'NgRx', 'TypeScript'],
      'php': ['Laravel', 'WordPress', 'Composer']
    };

    // Encontra habilidades relacionadasreact, TypeScript
    let novaHabilidade = texto;
    
    Object.entries(habilidadesRelacionadas).forEach(([key, values]) => {
      if (texto.toLowerCase().includes(key)) {
        const habilidadeAleatoria = values[Math.floor(Math.random() * values.length)];
        novaHabilidade = `${texto}, ${habilidadeAleatoria}`;
      }
    });

    return novaHabilidade;
  };

  const melhorarExperiencia = (texto: string): string => {
    // Melhora descrições de experiência
    const melhorias = [
      ' utilizando melhores práticas de desenvolvimento',
      ' resultando em 30% de aumento de eficiência',
      ' com foco na experiência do usuário',
      ' garantindo alta performance e qualidade',
      ' implementando soluções inovadoras',
      ' através de metodologias ágeis',
      ' com versionamento Git e deploy contínuo',
      ' realizando code reviews e pair programming',
      ' otimizando processos e reduzindo custos',
      ' colaborando com equipes multidisciplinares'
    ];

    const verbosAcao: Record<string, string[]> = {
      'trabalhei': ['Desempenhei funções de', 'Atuei no', 'Fui responsável pelo'],
      'fiz': ['Implementei', 'Desenvolvi', 'Criei', 'Construí'],
      'ajudei': ['Colaborei no', 'Contribuí para', 'Participei ativamente do'],
      'usei': ['Utilizei', 'Apliquei', 'Empreguei'],
      'aprendi': ['Adquiri conhecimento em', 'Dominei', 'Especializei-me em']
    };

    let textoMelhorado = texto;

    // Melhora verbos de ação
    Object.entries(verbosAcao).forEach(([verbo, alternativas]) => {
      if (texto.toLowerCase().includes(verbo)) {
        const alternativaAleatoria = alternativas[Math.floor(Math.random() * alternativas.length)];
        textoMelhorado = textoMelhorado.replace(new RegExp(verbo, 'gi'), alternativaAleatoria);
      }
    });

    // Adiciona melhoria final
    const melhoriaAleatoria = melhorias[Math.floor(Math.random() * melhorias.length)];
    return textoMelhorado + melhoriaAleatoria;
  };

  return (
    <button 
      onClick={melhorarTexto}
      disabled={carregando || !texto.trim()}
      className="botao-ia"
      style={{
        padding: '0.5rem 1rem',
        background: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: carregando ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        marginTop: '0.5rem',
        opacity: carregando || !texto.trim() ? 0.6 : 1,
        transition: 'all 0.3s ease'
      }}
    >
      {carregando ? (
        <>
          <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
          Processando...
        </>
      ) : (
        <>
          <Sparkles size={16} />
          Melhorar com IA
        </>
      )}
    </button>
  );
}