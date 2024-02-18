import Gestor from '../entities/Gestor';
import GestorInterface from '../interfaces/IGestor';
import { AppDataSource } from '../../database/data-source';

const GestorRepository = AppDataSource.getRepository(Gestor);

const createGestor = async (gestorData: GestorInterface): Promise<GestorInterface> => {
    const newGestor = GestorRepository.create(gestorData);
    const savedGestor = await GestorRepository.save(newGestor);
    return savedGestor;
};

const getGestores = (): Promise<GestorInterface[]> => {
    return GestorRepository.find() as Promise<GestorInterface[]>;
};

const getGestorById = async (gestorId: number): Promise<GestorInterface | undefined> => {
    const gestor = await GestorRepository.findOne({ where: { id: gestorId } });

    return gestor || undefined;
};

const getGestoryEmail = async (email: string): Promise<Gestor | undefined> => {
      const gestor = await GestorRepository.findOne({ where: { email } });
      return gestor || undefined;
    
  }


const deleteGestor = async (gestorId: number): Promise<boolean> => {
    const deleteResult = await GestorRepository.delete(gestorId);
    return deleteResult.affected === 1;
};

const updateGestor = async (gestorId: number, gestorData: Partial<GestorInterface>): Promise<GestorInterface | undefined> => {
    let gestor = await GestorRepository.findOne ({ where: { id: gestorId } });
   

    if (!gestor) {
        return undefined;
    }

    gestor.nome = gestorData.nome || gestor.nome;
    gestor.cargo = gestorData.cargo || gestor.cargo;
    gestor.email = gestorData.email || gestor.email;
    gestor.telefone = gestorData.telefone || gestor.telefone;
    

    gestor = await GestorRepository.save(gestor);

    return gestor;
};

export default { createGestor, getGestores, getGestoryEmail, getGestorById, deleteGestor, updateGestor }