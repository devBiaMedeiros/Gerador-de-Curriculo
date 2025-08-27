type Props = {
  onChange: (campo: string, valor: string) => void;
};

export default function Habilidades({ onChange }: Props) {
  return (
    <div>
      <h3>Habilidades</h3>
      <textarea 
        placeholder="Liste suas habilidades" 
        onChange={(e) => onChange("habilidades", e.target.value)} 
      />
    </div>
  );
}