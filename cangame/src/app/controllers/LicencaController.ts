import { Request, Response, Router } from 'express';
import Licenca from '../entities/Licenca';
import  LicencaRepository  from '../repositories/LicencaRepository'
import ContratoRepository from '../repositories/ContratoRepository';


const routeLicenca = Router();

export const getLicencas = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const licencaes = await LicencaRepository.getLicencaes();
        return res.status(200).json(licencaes);
    } catch (error) {
        console.error('Erro ao obter Licenças:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getLicencaById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const licencaId = parseInt(req.params.id, 10);
        const licenca = await LicencaRepository.getLicencaById(licencaId);

        if (!licenca) {
            return res.status(404).json({ error: 'Licença não encontrado' });
        }

        return res.status(200).json(licenca);
    } catch (error) {
        console.error('Erro ao obter Licenca por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const createLicenca = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { total, utilizadas, dataAquisicao, dataExpiracao, contrato } = req.body;

        const contratoExistente = await ContratoRepository.getContratoById(contrato);

        if (!contratoExistente) {
            return res.status(400).json({ error: 'Não existe um Contrato com este ID' });
        }

        const contratocoSalvo = contratoExistente || (await ContratoRepository.createContrato(contrato));

        const disponivel = total - utilizadas;

        const novoLicenca = new Licenca(
            total, utilizadas, disponivel, dataAquisicao, dataExpiracao, contrato
        );

        const licencaSalvo = await LicencaRepository.createLicenca(novoLicenca);

        return res.status(201).json(licencaSalvo);
    } catch (error) {
        console.error('Erro ao criar Licença:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const updateLicenca = async (req: Request, res: Response): Promise<Response> => {
    try {
        const licencatId = parseInt(req.params.id, 10);
        const licencaToUpdate = req.body as Licenca;

        licencaToUpdate.disponivel = licencaToUpdate.total - licencaToUpdate.utilizadas;

        const updatedLicenca = await LicencaRepository.updateLicenca(licencatId, licencaToUpdate);

        if (!updatedLicenca) {
            return res.status(404).json({ error: 'Licença não encontrada' });
        }

        return res.status(200).json({ message: 'Licença atualizada com sucesso', licenca: updatedLicenca });
    } catch (error) {
        console.error('Erro ao atualizar Licença:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};


export const deleteLicenca = async (req: Request, res: Response): Promise<Response> => {
    try {
        const licencaId = parseInt(req.params.id, 10);
        const deleteLicenca = await LicencaRepository.deleteLicenca(licencaId);

        if (!deleteLicenca) {
            return res.status(404).json({ error: 'Licença não encontrado' });
        }

        return res.status(200).json({ message: 'Licença excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir Licença:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default routeLicenca;
