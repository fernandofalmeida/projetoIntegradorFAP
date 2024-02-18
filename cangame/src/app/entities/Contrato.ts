
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Endereco from './Endereco';
import Administrador from './Administrador';

@Entity()
class Contrato {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    cnpj: string;

    @Column()
    nome: string;

    @Column()
    logotipo: string;

    @Column()
    email: string;

    @Column()
    qtdLicencas: number;

    @Column()
    termo: boolean;

    @ManyToOne(() => Administrador, { eager: true }) 
    @JoinColumn({ name: 'administradorId' })
    administrador: Administrador;

    @ManyToOne(() => Endereco, { eager: true }) 
    @JoinColumn({ name: 'enderecoId' })
    endereco: Endereco;
  

    constructor(
        cnpj: string,
        nome: string,
        logotipo: string,
        email: string,
        qtdLicencas: number,
        termo: boolean,
        administrador: Administrador,
        endereco: Endereco

    ) {
        this.cnpj = cnpj;
        this.nome = nome;
        this.logotipo = logotipo;
        this.email = email;
        this.qtdLicencas = qtdLicencas;
        this.termo = termo;
        this.administrador = administrador;
        this.endereco = endereco;
    }


    getId(): number | undefined {
        return this.id;
    }

    getCnpj(): string {
        return this.cnpj;
    }

    getNome(): string {
        return this.nome;
    }

    getLogotipo(): string {
        return this.logotipo;
    }

    getEmail(): string {
        return this.email;
    }

    getQtdLicencas(): number {
        return this.qtdLicencas;
    }

    getTermo(): boolean {
        return this.termo;
    }
    
    getAdministrador(): Administrador {
        return this.administrador;
    }


    getEndereco(): Endereco {
        return this.endereco;
    }

   
    setCnpj(cnpj: string): void {
        this.cnpj = cnpj;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    setLogotipo(logotipo: string): void {
        this.logotipo = logotipo;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setQtdLicencas(qtdLicencas: number): void {
        this.qtdLicencas = qtdLicencas;
    }

    setTermo(termo: boolean): void {
        this.termo = termo;
    }
    
    setAdministrador(administrador: Administrador): void {
        this.administrador = administrador;
    }


    setEndereco(endereco: Endereco): void {
        this.endereco = endereco;
    }

}

export default Contrato;
