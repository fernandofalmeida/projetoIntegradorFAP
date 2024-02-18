import Contrato from "../entities/Contrato";

interface IGestor {
    id?: number;
    nome: string;
    cargo: string;
    email: string;
    telefone: string;
    contrato: Contrato;
  
}

export default IGestor;