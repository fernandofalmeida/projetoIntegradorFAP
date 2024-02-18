import { Request, Response, Router } from 'express';
import Administrador from '../entities/Administrador';
import  AdministradorRepository  from '../repositories/AdministradorRepository'


const routeAdministrador = Router();

export const getAdministradores = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const administrador = await AdministradorRepository.getAdministradores();
        return res.status(200).json(administrador);
    } catch (error) {
        console.error('Erro ao obter os Administradores:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getAdministradorById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const administradorId = parseInt(req.params.id, 10);
        const administrador = await AdministradorRepository.getAdministradorById(administradorId);

        if (!administrador) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }

        return res.status(200).json(administrador);
    } catch (error) {
        console.error('Erro ao obter Administrador por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createAdministrador = async (req: Request, res: Response): Promise<Response> => {
    try {
        const administradorData = req.body as Administrador;
        const administradorExistente = await AdministradorRepository.getAdministradorByNome(administradorData.nome);

        if (administradorExistente) {
            return res.status(400).json({ error: 'Já existe um administrador com este nome.' });
        }

        const newAdministrador = await AdministradorRepository.createAdministrador(administradorData);
        return res.status(201).json(newAdministrador);
    } catch (error) {
        console.error('Erro ao criar Administrador:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const updateAdministrador = async (req: Request, res: Response): Promise<Response> => {
    try {
        const administradortId = parseInt(req.params.id, 10);
        const updatedAdministrador = await AdministradorRepository.updateAdministrador(administradortId, req.body as Administrador);

        if (!updatedAdministrador) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }

        return res.status(200).json({ message: 'Administrador atualizado com sucesso', administrador: updatedAdministrador });
    } catch (error) {
        console.error('Erro ao atualizar Administrador:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteAdministrador = async (req: Request, res: Response): Promise<Response> => {
    try {
        const administradortId = parseInt(req.params.id, 10);
        const deleteAdministrador = await AdministradorRepository.deleteAdministrador(administradortId);

        if (!deleteAdministrador) {
            return res.status(404).json({ error: 'Administrador não encontrado' });
        }

        return res.status(200).json({ message: 'Administrador excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir Administrador:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeAdministrador;
