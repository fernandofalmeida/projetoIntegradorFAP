import "reflect-metadata"
import { DataSource } from "typeorm"
import {CreateUsersTable1701898179260 } from './migrations/1701898179260-CreateUsersTable'
import { CreateEnderecoTable1702385543443 } from "./migrations/1702385543443-CreateEnderecoTable"
import { CreateContratoTable1701898179260} from './migrations/1701974771820-CreateContratoTable'
import { CreateTelefoneTable1702385558636 } from "./migrations/1702385558636-CreateTelefoneTable"
import {  CreateGestorTable1702035423371 } from "./migrations/1702035423371-CreateGestorTable"
import { CreateAdministradorTable1704293918956 } from "./migrations/1704293918956-CreateAdministradorTable"
import { CreateLicencaTable1704293947344 } from "./migrations/1704293947344-CreateLicencaTable"

import User  from '../app/entities/User'
import Endereco from "../app/entities/Endereco"
import Contrato from "../app/entities/Contrato"
import Telefone from "../app/entities/Telefone"
import Gestor from "../app/entities/Gestor"
import Administrador from "../app/entities/Administrador"
import Licenca from "../app/entities/Licenca"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "moy.h.filess.io",
    port: 3307,
    username: "CgBD_adjective",
    password: "38e25298813eb466430a2da86d72bab09bf404b2",
    database: "CgBD_adjective",
    synchronize: true,
    logging: false,
    entities: [User, Endereco, Administrador, Contrato, Licenca, Telefone, Gestor],
    migrations: [
        //Executa primeiro o comando para criar estas tabelas
        CreateUsersTable1701898179260, 
        CreateEnderecoTable1702385543443, 
        CreateAdministradorTable1704293918956,

        //Executa segundo comando para criar estas tabelas por causa dos relacionamentos
        CreateContratoTable1701898179260,
        CreateLicencaTable1704293947344,
        CreateTelefoneTable1702385558636,
       CreateGestorTable1702035423371, 
],
    subscribers: [],
})
