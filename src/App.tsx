import { useState } from "react";
import DadosPessoais from "./components/DadosPessoais";
import Habilidades from "./components/Habilidades";
import Experiencia from "./components/Experiencia";
import Preview from "./components/Preview";

import "./App.css"; 

function App() {
  const [curriculo, setCurriculo] = useState({
    nome: "",
    email: "",
    telefone: "",
    linkedin: "",
    habilidades: "",
    experiencia: ""
  });

  const handleChange = (campo: string, valor: string) => {
    setCurriculo({ ...curriculo, [campo]: valor });
  };

  return (
    <div className="container">
      {/* Coluna do formulário */}
      <div className="form-section">
        <h2>Informações do Currículo</h2>
        <DadosPessoais onChange={handleChange} />
        <Habilidades onChange={handleChange} />
        <Experiencia onChange={handleChange} />
      </div>

      {/* Coluna do Preview */}
      <div className="preview-section">
        <Preview dados={curriculo} />
      </div>
    </div>
  );
}

export default App;
