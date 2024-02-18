
import LicencaInterface from '../interfaces/ILicenca';
import { AppDataSource } from '../../database/data-source';
import Licenca from '../entities/Licenca';

const LicencaRepository = AppDataSource.getRepository(Licenca);

const createLicenca = async (licencaData: LicencaInterface): Promise<LicencaInterface> => {
    const newLicenca = LicencaRepository.create(licencaData);
    const savedLicenca = await LicencaRepository.save(newLicenca);
    return savedLicenca;
};

const getLicencaes = (): Promise<LicencaInterface[]> => {
    return LicencaRepository.find() as Promise<LicencaInterface[]>;
};

const getLicencaById = async (licencaId: number): Promise<LicencaInterface | undefined> => {
    const licenca = await LicencaRepository.findOne({ where: { id: licencaId } });

    return licenca || undefined;
};

const deleteLicenca = async (licencaId: number): Promise<boolean> => {
    const deleteResult = await LicencaRepository.delete(licencaId);
    return deleteResult.affected === 1;
};

const updateLicenca = async (licencaId: number, licencaData: Partial<LicencaInterface>): Promise<LicencaInterface | undefined> => {
    let licenca = await LicencaRepository.findOne ({ where: { id: licencaId } });
   

    if (!licenca) {
        return undefined;
    }

    licenca.total = licencaData.total || licenca.total;
    licenca.utilizadas = licencaData.utilizadas || licenca.utilizadas;
    licenca.disponivel = licencaData.disponivel || licenca.disponivel;
    licenca.dataAquisicao = licencaData.dataAquisicao || licenca.dataAquisicao;
    licenca.dataAquisicao = licencaData.dataAquisicao || licenca.dataAquisicao;
    
    licenca = await LicencaRepository.save(licenca);

    return licenca;
};

export default { createLicenca, getLicencaes, getLicencaById, deleteLicenca, updateLicenca }