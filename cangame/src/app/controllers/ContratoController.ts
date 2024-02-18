import { Request, Response, Router } from 'express';
import Contrato from '../entities/Contrato';
import  ContratoRepository  from '../repositories/ContratoRepository'
import EnderecoRepository from '../repositories/EnderecoRepository';
import AdministradorRepository from '../repositories/AdministradorRepository';
import Administrador from '../entities/Administrador';
import Endereco from '../entities/Endereco';
import { getRepository } from 'typeorm';


const routeContrato = Router();

export const getContratos = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const contracts = await ContratoRepository.getContratos();
        return res.status(200).json(contracts);
    } catch (error) {
        console.error('Erro ao obter contratos:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const getContratoById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contratoId = parseInt(req.params.id, 10);
        const contrato = await ContratoRepository.getContratoById(contratoId);

        if (!contrato) {
            return res.status(404).json({ error: 'Contrato não encontrado' });
        }

        return res.status(200).json(contrato);
    } catch (error) {
        console.error('Erro ao obter contrato por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const createContrato = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { cnpj, nome, logotipo, email, qtdLicencas, termo, administrador, endereco } = req.body;

        const existingContrato = await ContratoRepository.getContratoyCnpj(cnpj);

        if (existingContrato) {

            return res.status(400).json({ error: 'Já existe um contrato com este CNPJ' });
        }

        const enderecoExistente = await EnderecoRepository.getEnderecoById(endereco);

        if (!enderecoExistente) {
            return res.status(400).json({ error: 'Não existe um Endereço com este ID' });
        }

        const enderecoSalvo = enderecoExistente || (await EnderecoRepository.createEndereco(endereco));

        const novoContrato = new Contrato(
            cnpj, nome, logotipo, email, qtdLicencas, termo, administrador, endereco
        );

        const contratoSalvo = await ContratoRepository.createContrato(novoContrato);

        return res.status(201).json(contratoSalvo);
    } catch (error) {
        console.error('Erro ao criar contrato:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};







export const updateContrato = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contratotId = parseInt(req.params.id, 10);
        const updatedContrato = await ContratoRepository.updateContrato(contratotId, req.body as Contrato);

        if (!updatedContrato) {
            return res.status(404).json({ error: 'Contrato não encontrado' });
        }

        return res.status(200).json({ message: 'Contrato atualizado com sucesso', contrato: updatedContrato });
    } catch (error) {
        console.error('Erro ao atualizar contrato:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteContrato = async (req: Request, res: Response): Promise<Response> => {
    try {
        const contratoId = parseInt(req.params.id, 10);
        const deleteContrato = await ContratoRepository.deleteContrato(contratoId);

        if (!deleteContrato) {
            return res.status(404).json({ error: 'Contrato não encontrado' });
        }

        return res.status(200).json({ message: 'Contrato excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir contrato:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeContrato;
