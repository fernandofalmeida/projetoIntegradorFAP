import Telefone from '../entities/Telefone';
import TelefoneInterface from '../interfaces/ITelefone';
import { AppDataSource } from '../../database/data-source';

const TelefoneRepository = AppDataSource.getRepository(Telefone);

const createTelefone = async (telefoneData: TelefoneInterface): Promise<TelefoneInterface> => {
    const newTelefone = TelefoneRepository.create(telefoneData);
    const savedTelefone = await TelefoneRepository.save(newTelefone);
    return savedTelefone;
};

const getTelefones = (): Promise<TelefoneInterface[]> => {
    return TelefoneRepository.find() as Promise<TelefoneInterface[]>;
};

const getTelefoneById = async (telefoneId: number): Promise<TelefoneInterface | undefined> => {
    const telefone = await TelefoneRepository.findOne({ where: { id: telefoneId } });

    return telefone || undefined;
};

const getTelefoneByNumeroAndContrato = async (numero: string, contratoId: number): Promise<TelefoneInterface | undefined> => {
    const telefone = await TelefoneRepository.findOne({
        where: {
            numero,
            contrato: { id: contratoId },
        },
    });

    return telefone || undefined;
};


const deleteTelefone = async (telefoneId: number): Promise<boolean> => {
    const deleteResult = await TelefoneRepository.delete(telefoneId);
    return deleteResult.affected === 1;
};

const updateTelefone = async (telefoneId: number, telefoneData: Partial<TelefoneInterface>): Promise<TelefoneInterface | undefined> => {
    let telefone = await TelefoneRepository.findOne ({ where: { id: telefoneId } });
   

    if (!telefone) {
        return undefined;
    }


    telefone.numero = telefoneData.numero || telefone.numero;
  
    telefone = await TelefoneRepository.save(telefone);

    return telefone;
};

export default { createTelefone, getTelefones, getTelefoneById, getTelefoneByNumeroAndContrato, deleteTelefone, updateTelefone }