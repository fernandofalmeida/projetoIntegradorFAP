import Contrato from "../entities/Contrato";

interface ILicenca {
    id?: number;
    total: number;
    utilizadas: number;
    disponivel: number;
    dataAquisicao: Date;
    dataExpiracao: Date;
    contrato: Contrato;
}

export default ILicenca;