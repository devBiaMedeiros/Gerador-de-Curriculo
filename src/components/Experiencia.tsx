type Props = {
  onChange: (campo: string, valor: string) => void;
};

export default function Experiencia({ onChange }: Props) {
  return (
    <div>
      <h3>Experiência Profissional</h3>
      <textarea 
        placeholder="Descreva sua experiência profissional" 
        onChange={(e) => onChange("experiencia", e.target.value)} 
      />
    </div>
  );
}