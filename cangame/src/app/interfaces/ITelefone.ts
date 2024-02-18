import Contrato from "../entities/Contrato";

interface ITelefone {
    id?: number;
    numero: string;
    contrato: Contrato;
  
}

export default ITelefone;