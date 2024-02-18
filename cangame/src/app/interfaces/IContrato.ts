import Administrador from "../entities/Administrador";
import Endereco from "../entities/Endereco";

interface IContrato {
    id?: number;
    cnpj: string;
    nome: string;
    logotipo: string;
    email: string;
    qtdLicencas: number;
    termo: boolean;
    administrador: Administrador;
    endereco: Endereco;
}

export default IContrato;