import { Request, Response, Router } from 'express';
import Endereco from '../entities/Endereco';
import  EnderecoRepository  from '../repositories/EnderecoRepository'


const routeEndereco = Router();

export const getEnderecos = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const endereco = await EnderecoRepository.getEnderecos();
        return res.status(200).json(endereco);
    } catch (error) {
        console.error('Erro ao obter Enderecos:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getEnderecoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const enderecoId = parseInt(req.params.id, 10);
        const endereco = await EnderecoRepository.getEnderecoById(enderecoId);

        if (!endereco) {
            return res.status(404).json({ error: 'Endereco não encontrado' });
        }

        return res.status(200).json(endereco);
    } catch (error) {
        console.error('Erro ao obter Endereco por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createEndereco = async (req: Request, res: Response): Promise<Response> => {
    try {
        const enderecoData = req.body as Endereco;

        const newEndereco = await EnderecoRepository.createEndereco(enderecoData);
        return res.status(201).json(newEndereco);
    } catch (error) {
        console.error('Erro ao criar Endereco:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateEndereco = async (req: Request, res: Response): Promise<Response> => {
    try {
        const enderecotId = parseInt(req.params.id, 10);
        const updatedEndereco = await EnderecoRepository.updateEndereco(enderecotId, req.body as Endereco);

        if (!updatedEndereco) {
            return res.status(404).json({ error: 'Endereco não encontrado' });
        }

        return res.status(200).json({ message: 'Endereco atualizado com sucesso', endereco: updatedEndereco });
    } catch (error) {
        console.error('Erro ao atualizar Endereco:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteEndereco = async (req: Request, res: Response): Promise<Response> => {
    try {
        const enderecotId = parseInt(req.params.id, 10);
        const deleteEndereco = await EnderecoRepository.deleteEndereco(enderecotId);

        if (!deleteEndereco) {
            return res.status(404).json({ error: 'Endereco não encontrado' });
        }

        return res.status(200).json({ message: 'Endereco excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir Endereco:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeEndereco;
