// repositories/UserRepository.ts

import User from "../entities/User";
import IUser from "../interfaces/IUser";
import { AppDataSource } from "../../database/data-source";

const userRepository = AppDataSource.getRepository(User);

const createUser = async (userData: IUser): Promise<IUser> => {
    const newUser = userRepository.create(userData);
    await newUser.hashPassword(); // Criptografa a senha antes de salvar
    const savedUser = await userRepository.save(newUser);
    return savedUser;
};

const getUsers = (): Promise<IUser[]> => {
    return userRepository.find() as Promise<IUser[]>;
};

const getUserById = async (userId: number): Promise<IUser | undefined> => {
    const user = await userRepository.findOne({ where: { id: userId } });
    return user || undefined;
};

const getByEmail = async (email: string): Promise<IUser | undefined> => {
    const user = await userRepository.findOne({ where: { email } });

    return user || undefined;
};

const deleteUserById = async (userId: number): Promise<boolean> => {
    const deleteResult = await userRepository.delete(userId);
    return deleteResult.affected === 1;
};

const updateUserById = async (userId: number, userData: Partial<IUser>): Promise<IUser | undefined> => {
    let user = await userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
        return undefined;
    }

    user.email = userData.email || user.email;
    user.nivelAcesso = userData.nivelAcesso || user.nivelAcesso;
    user.dataCadastro = userData.dataCadastro || user.dataCadastro;

    if (userData.password) {
        user.password = userData.password;

        if (typeof user.hashPassword === 'function') {
            await user.hashPassword(); 
        }
    }

    user = await userRepository.save(user);

    return user;
};

export default { createUser, getUsers, getByEmail, getUserById, deleteUserById, updateUserById };



