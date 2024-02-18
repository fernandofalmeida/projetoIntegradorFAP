import { Request, Response, Router } from 'express';
import Gestor from '../entities/Gestor';
import  GestorRepository  from '../repositories/GestorRepository'
import ContratoRepository from '../repositories/ContratoRepository';


const routeGestor = Router();

export const getGestores = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const gestores = await GestorRepository.getGestores();
        return res.status(200).json(gestores);
    } catch (error) {
        console.error('Erro ao obter Gestores:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getGestorById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const gestorId = parseInt(req.params.id, 10);
        const gestor = await GestorRepository.getGestorById(gestorId);

        if (!gestor) {
            return res.status(404).json({ error: 'Gestor não encontrado' });
        }

        return res.status(200).json(gestor);
    } catch (error) {
        console.error('Erro ao obter Gestor por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const createGestor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { nome, cargo, email, telefone, contrato } = req.body;

        const existingGestor = await GestorRepository.getGestoryEmail(email);

        if (existingGestor) {
            return res.status(400).json({ error: 'Já existe um Gestor com este e-mail' });
        }

        const contratoExistente = await ContratoRepository.getContratoById(contrato);

        if (!contratoExistente) {
            return res.status(400).json({ error: 'Não existe um Contrato com este ID' });
        }

        const contratocoSalvo = contratoExistente || (await ContratoRepository.createContrato(contrato));

        const novoGestor = new Gestor(
            nome, cargo, email, telefone, contrato
        );

        const gestorSalvo = await GestorRepository.createGestor(novoGestor);
        
        return res.status(201).json(gestorSalvo);
    } catch (error) {
        console.error('Erro ao criar Gestor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateGestor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const gestortId = parseInt(req.params.id, 10);
        const updatedGestor = await GestorRepository.updateGestor(gestortId, req.body as Gestor);

        if (!updatedGestor) {
            return res.status(404).json({ error: 'Gestor não encontrado' });
        }

        return res.status(200).json({ message: 'Gestor atualizado com sucesso', gestor: updatedGestor });
    } catch (error) {
        console.error('Erro ao atualizar Gestor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteGestor = async (req: Request, res: Response): Promise<Response> => {
    try {
        const gestorId = parseInt(req.params.id, 10);
        const deleteGestor = await GestorRepository.deleteGestor(gestorId);

        if (!deleteGestor) {
            return res.status(404).json({ error: 'Gestor não encontrado' });
        }

        return res.status(200).json({ message: 'Gestor excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir Gestor:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeGestor;
