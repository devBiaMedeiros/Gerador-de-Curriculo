type Props = {
  onChange: (campo: string, valor: string) => void;
};

export default function DadosPessoais({ onChange }: Props) {
  return (
   <div>
      <h3>Dados Pessoais</h3>
      <input 
        type="text" 
        placeholder="Nome Completo" 
        onChange={(e) => onChange("nome", e.target.value)} 
      />
      <input 
        type="email" 
        placeholder="Email" 
        onChange={(e) => onChange("email", e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone" 
        onChange={(e) => onChange("telefone", e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="LinkedIn" 
        onChange={(e) => onChange("linkedin", e.target.value)} 
      />
    </div>
  );
}
      