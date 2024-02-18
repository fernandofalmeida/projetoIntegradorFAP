import Administrador from '../entities/Administrador';
import { AppDataSource } from '../../database/data-source';
import AdministradorInterface from '../interfaces/IAdministrador';


const AdministradorRepository = AppDataSource.getRepository(Administrador);

const createAdministrador = async (administradorData: AdministradorInterface): Promise<Administrador> => {
 
    const newAdministrador = AdministradorRepository.create(administradorData);

    const savedAdministrador = await AdministradorRepository.save(newAdministrador);

    return savedAdministrador;
};

const getAdministradores = (): Promise<AdministradorInterface[]> => {
    return AdministradorRepository.find() as Promise<AdministradorInterface[]>;
};

const getAdministradorById = async (administradorId: number): Promise<AdministradorInterface | undefined> => {
    const administrador = await AdministradorRepository.findOne({ where: { id: administradorId } });

    return administrador || undefined;
};

const getAdministradorByNome = async (nome: string): Promise<Administrador | undefined> => {
    const administrador = await AdministradorRepository.findOne({ where: { nome } });
    return administrador || undefined;
  
}

const deleteAdministrador = async (administradorId: number): Promise<boolean> => {
    const deleteResult = await AdministradorRepository.delete(administradorId);
    return deleteResult.affected === 1;
};

const updateAdministrador = async (administradorId: number, administradorData: Partial<AdministradorInterface>): Promise<AdministradorInterface | undefined> => {
    let administrador = await AdministradorRepository.findOne ({ where: { id: administradorId } });
   

    if (!administrador) {
        return undefined;
    }

    administrador.nome = administradorData.nome || administrador.nome;
    administrador.cargo = administradorData.cargo || administrador.cargo;

    administrador = await AdministradorRepository.save(administrador);

    return administrador;
};

export default { createAdministrador, getAdministradores, getAdministradorById, getAdministradorByNome, deleteAdministrador, updateAdministrador }