import {Request, Response, Router } from 'express';
import User from '../entities/User';
import UserRepository from '../repositories/UserRepository';
import IUser from '../interfaces/IUser';
import AuthService from '../services/AuthService';
import  jwt  from 'jsonwebtoken';


const routeUser = Router();

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const users = await UserRepository.getUsers();
        return res.status(200).json(users);
    } catch (error) {
        console.error('Erro ao obter usuários:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = parseInt(req.params.id, 10);
        const user = await UserRepository.getUserById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Erro ao obter usuário por ID:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};



export const createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userData = req.body;
        
        const existingUser = await UserRepository.getByEmail(userData.email);
        
        if (existingUser) {
            return res.status(400).json({ error: 'E-mail já cadastrado' });
        }


        const newUser = await UserRepository.createUser(userData);
        const token = AuthService.generateToken(newUser);

        return res.status(201).json({ user: newUser, token });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await UserRepository.getByEmail(email);

        if (!user) {
            return res.status(401).json({ error: 'Usuário não encontrado' });
        }

        const isPasswordValid = await user.checkPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha inválida' });
        }

        const token = AuthService.generateToken(user as IUser);
        return res.status(200).json({ user, token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = parseInt(req.params.id, 10);

        // Use o método atualizado para atualizar o usuário
        const updatedUser = await UserRepository.updateUserById(userId, req.body);

        if (!updatedUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Gere um novo token após a atualização do usuário
        const token = AuthService.generateToken(updatedUser);

        return res.status(200).json({ message: 'Usuário atualizado com sucesso', user: updatedUser, token });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const userId = parseInt(req.params.id, 10); // Converte a string para número
        // ou: const userId = Number(req.params.id);
        
        const deleteUser = await UserRepository.deleteUserById(userId);

        if (!deleteUser) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        return res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
        console.error('Erro ao excluir usuário:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    

};
export const getProfile = async (req: Request, res: Response) => {
  
    return res.json('Dados do Usuário Logado');
    
}