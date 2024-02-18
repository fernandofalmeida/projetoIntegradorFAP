import Endereco from '../entities/Endereco';
import { AppDataSource } from '../../database/data-source';
import EnderecoInterface from '../interfaces/IEndereco';


const EnderecoRepository = AppDataSource.getRepository(Endereco);

const createEndereco = async (enderecoData: EnderecoInterface): Promise<Endereco> => {

    const newEndereco = EnderecoRepository.create(enderecoData);

    const savedEndereco = await EnderecoRepository.save(newEndereco);

    return savedEndereco;
};

const getEnderecos = (): Promise<EnderecoInterface[]> => {
    return EnderecoRepository.find() as Promise<EnderecoInterface[]>;
};

const getEnderecoById = async (enderecoId: number): Promise<EnderecoInterface | undefined> => {
    const endereco = await EnderecoRepository.findOne({ where: { id: enderecoId } });

    return endereco || undefined;
};


const deleteEndereco = async (enderecoId: number): Promise<boolean> => {
    const deleteResult = await EnderecoRepository.delete(enderecoId);
    return deleteResult.affected === 1;
};

const updateEndereco = async (enderecoId: number, enderecoData: Partial<EnderecoInterface>): Promise<EnderecoInterface | undefined> => {
    let endereco = await EnderecoRepository.findOne ({ where: { id: enderecoId } });
   

    if (!endereco) {
        return undefined;
    }

    endereco.cep = enderecoData.cep || endereco.cep;
    endereco.rua = enderecoData.rua || endereco.rua;
    endereco.numero = enderecoData.numero || endereco.numero;
    endereco.comp = enderecoData.comp || endereco.comp;
    endereco.bairro = enderecoData.bairro || endereco.bairro;
    endereco.cidade = enderecoData.cidade || endereco.cidade;
    endereco.UF = enderecoData.UF || endereco.UF;

    endereco = await EnderecoRepository.save(endereco);

    return endereco;
};

export default { createEndereco, getEnderecos, getEnderecoById, deleteEndereco, updateEndereco }