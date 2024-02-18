import { Request, Response, Router } from "express";
import { createUser, loginUser , getUsers, getUserById, deleteUser, updateUser, getProfile } from '../controllers/UserController';
import { createContrato, deleteContrato, getContratoById, getContratos, updateContrato } from "../controllers/ContratoController";
import { authenticationMiddleware } from "../middlewares/authenticationMiddleware";
import { createGestor, deleteGestor, getGestorById, getGestores, updateGestor } from "../controllers/GestorController";
import { createEndereco, deleteEndereco, getEnderecoById, getEnderecos, updateEndereco } from "../controllers/EnderecoController";
import { createTelefone, deleteTelefone, getTelefoneById, getTelefones, updateTelefone } from "../controllers/TelefoneController";
import { createAdministrador, deleteAdministrador, getAdministradorById, getAdministradores, updateAdministrador } from "../controllers/AdministradorController";
import { createLicenca, deleteLicenca, getLicencaById, getLicencas, updateLicenca } from "../controllers/LicencaController";


const routers = Router();

// Rotas do Cadastro e Consultas dos Usuários
routers.get('/users', authenticationMiddleware, getUsers); //http://localhost:3001/users
routers.get('/user/:id', authenticationMiddleware, getUserById);//http://localhost:3001/user/id
routers.post('/user', authenticationMiddleware, createUser);//http://localhost:3001/user
routers.put('/user/:id', authenticationMiddleware, updateUser);//http://localhost:3001/user/id
routers.delete('/user/:id', authenticationMiddleware, deleteUser);//http://localhost:3001/user/id

//Rota para fazer o Login do Usuário
routers.post('/login', loginUser);//http://localhost:3001/login


//Rotas do Cadastro e Consultas de Administrador
routers.get('/administradores', authenticationMiddleware, getAdministradores);//http://localhost:3001/administradores
routers.get('/administrador/:id', authenticationMiddleware, getAdministradorById);//http://localhost:3001/administrador/id
routers.post('/administrador', authenticationMiddleware, createAdministrador);//http://localhost:3001/administrador
routers.put('/administrador/:id', authenticationMiddleware, updateAdministrador); //http://localhost:3001/administrador/id
routers.delete('/administrador/:id', authenticationMiddleware, deleteAdministrador);//http://localhost:3001/administrador/id

//Rotas do Cadastro e Consultas de Contrato
routers.get('/contratos', authenticationMiddleware, getContratos);//http://localhost:3001/contratos
routers.get('/contrato/:id', authenticationMiddleware, getContratoById);//http://localhost:3001/contrato/id
routers.post('/contrato', authenticationMiddleware, createContrato);//http://localhost:3001/contrato
routers.put('/contrato/:id', authenticationMiddleware, updateContrato);//http://localhost:3001/contrato/id
routers.delete('/contrato/:id', authenticationMiddleware, deleteContrato);//http://localhost:3001/contrato


//Rotas do Cadastro e Consultas de Licenças
routers.get('/licencas', authenticationMiddleware, getLicencas);//http://localhost:3001/licencas
routers.get('/licenca/:id', authenticationMiddleware, getLicencaById);//http://localhost:3001/licenca/id
routers.post('/licenca', authenticationMiddleware, createLicenca);//http://localhost:3001/licenca
routers.put('/licenca/:id', authenticationMiddleware, updateLicenca);//http://localhost:3001/licenca/id
routers.delete('/licenca/:id', authenticationMiddleware, deleteLicenca);//http://localhost:3001/licenca/id

//Rotas do Cadastro e Consultas de Gestor
routers.get('/gestores', authenticationMiddleware, getGestores);//http://localhost:3001/gestores
routers.get('/gestor/:id', authenticationMiddleware, getGestorById);//http://localhost:3001/gestor/id
routers.post('/gestor', authenticationMiddleware, createGestor);//http://localhost:3001/gestor
routers.put('/gestor/:id', authenticationMiddleware, updateGestor);//http://localhost:3001/gestor/id
routers.delete('/gestor/:id', authenticationMiddleware, deleteGestor);//http://localhost:3001/gestor/id

//Rotas do Cadastro e Consultas de Endereço
routers.get('/enderecos', authenticationMiddleware, getEnderecos);//http://localhost:3001/enderecos
routers.get('/endereco/:id', authenticationMiddleware, getEnderecoById);//http://localhost:3001/endereco/id
routers.post('/endereco', authenticationMiddleware, createEndereco);//http://localhost:3001/endereco
routers.put('/endereco/:id', authenticationMiddleware, updateEndereco);//http://localhost:3001/endereco/id
routers.delete('/endereco/:id', authenticationMiddleware, deleteEndereco);//http://localhost:3001/endereco/id


//Rotas do Cadastro e Consultas de Telefone
routers.get('/telefones', authenticationMiddleware, getTelefones);//http://localhost:3001/telefones
routers.get('/telefone/:id', authenticationMiddleware, getTelefoneById);//http://localhost:3001/telefone/id
routers.post('/telefone', authenticationMiddleware, createTelefone);//http://localhost:3001/telefone
routers.put('/telefone/:id', authenticationMiddleware, updateTelefone);//http://localhost:3001/telefone/id
routers.delete('/telefone/:id', authenticationMiddleware, deleteTelefone);//http://localhost:3001/telefone/id

export default routers;


