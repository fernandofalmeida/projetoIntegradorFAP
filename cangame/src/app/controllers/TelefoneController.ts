import { Request, Response, Router } from 'express';
import Telefone from '../entities/Telefone';
import  TelefoneRepository  from '../repositories/TelefoneRepository'
import ContratoRepository from '../repositories/ContratoRepository';


const routeTelefone = Router();

export const getTelefones = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const telefone = await TelefoneRepository.getTelefones();
        return res.status(200).json(telefone);
    } catch (error) {
        console.error('Erro ao obter Telefones:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getTelefoneById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const telefoneId = parseInt(req.params.id, 10);
        const telefone = await TelefoneRepository.getTelefoneById(telefoneId);

        if (!telefone) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        return res.status(200).json(telefone);
    } catch (error) {
        console.error('Erro ao obter Telefone por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createTelefone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { numero, contrato } = req.body;

        const contratoExistente = await ContratoRepository.getContratoById(contrato);

        if (!contratoExistente) {
            return res.status(400).json({ error: 'Não existe um Contrato com este ID' });
        }

        const telefoneExistente = await TelefoneRepository.getTelefoneByNumeroAndContrato(numero, contrato);

        if (telefoneExistente) {
            return res.status(400).json({ error: 'Já existe um telefone com este número para este contrato.' });
        }

        const contratoSalvo = contratoExistente || (await ContratoRepository.createContrato(contrato));

        const novoTelefone = new Telefone(
            numero,
            contrato
        );

        const telefoneSalvo = await TelefoneRepository.createTelefone(novoTelefone);

        return res.status(201).json(telefoneSalvo);
    } catch (error) {
        console.error('Erro ao criar Telefone:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const updateTelefone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const telefonetId = parseInt(req.params.id, 10);
        const updatedTelefone = await TelefoneRepository.updateTelefone(telefonetId, req.body as Telefone);

        if (!updatedTelefone) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        return res.status(200).json({ message: 'Telefone atualizado com sucesso', telefone: updatedTelefone });
    } catch (error) {
        console.error('Erro ao atualizar Telefone:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteTelefone = async (req: Request, res: Response): Promise<Response> => {
    try {
        const telefonetId = parseInt(req.params.id, 10);
        const deleteTelefone = await TelefoneRepository.deleteTelefone(telefonetId);

        if (!deleteTelefone) {
            return res.status(404).json({ error: 'Telefone não encontrado' });
        }

        return res.status(200).json({ message: 'Telefone excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir Telefone:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeTelefone;
