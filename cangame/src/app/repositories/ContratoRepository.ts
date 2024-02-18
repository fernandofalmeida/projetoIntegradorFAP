import Contrato from '../entities/Contrato';
import ContratoInterface from '../interfaces/IContrato';
import { AppDataSource } from '../../database/data-source';

const contratoRepository = AppDataSource.getRepository(Contrato);

const createContrato = async (contratoData: ContratoInterface): Promise<ContratoInterface> => {
    const newContrato = contratoRepository.create(contratoData);
    const savedContrato = await contratoRepository.save(newContrato);
    return savedContrato;
};

const getContratos = (): Promise<ContratoInterface[]> => {
    return contratoRepository.find() as Promise<ContratoInterface[]>;
};

const getContratoById = async (contratoId: number): Promise<ContratoInterface | undefined> => {
    const contrato = await contratoRepository.findOne({ where: { id: contratoId } });

    return contrato || undefined;
};

const getContratoyCnpj = async (cnpj: string): Promise<Contrato | undefined> => {
      const contrato = await contratoRepository.findOne({ where: { cnpj } });
      return contrato || undefined;
    
  }


const deleteContrato = async (contratoId: number): Promise<boolean> => {
    const deleteResult = await contratoRepository.delete(contratoId);
    return deleteResult.affected === 1;
};

const updateContrato = async (contratoId: number, contratoData: Partial<ContratoInterface>): Promise<ContratoInterface | undefined> => {
    let contrato = await contratoRepository.findOne ({ where: { id: contratoId } });
   

    if (!contrato) {
        return undefined;
    }

    contrato.cnpj = contratoData.cnpj || contrato.cnpj;
    contrato.nome = contratoData.nome || contrato.nome;
    contrato.logotipo = contratoData.logotipo || contrato.logotipo;
    contrato.email = contratoData.email || contrato.email;
    contrato.qtdLicencas = contratoData.qtdLicencas || contrato.qtdLicencas;
    contrato.termo = contratoData.termo || contrato.termo;
    contrato.administrador = contratoData.administrador || contrato.administrador;
    contrato.endereco = contratoData.endereco || contrato.endereco;

    contrato = await contratoRepository.save(contrato);

    return contrato;
};

export default { createContrato, getContratos, getContratoyCnpj, getContratoById, deleteContrato, updateContrato }