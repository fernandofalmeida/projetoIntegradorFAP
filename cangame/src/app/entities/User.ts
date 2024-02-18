
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import IUser from '../interfaces/IUser';

@Entity()
class User implements IUser {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    nivelAcesso: string;

    @Column({ type: 'timestamp' })
    dataCadastro: Date;


    constructor(email: string, password: string, nivelAcesso: string, dataCadastro: Date) {
        this.email = email;
        this.password = password;
        this.nivelAcesso = nivelAcesso;
        this.dataCadastro = dataCadastro;
    }

   
    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    getNivelAcesso(): string {
        return this.nivelAcesso;
    }

    getDataCadastro(): Date {
        return this.dataCadastro;
    }

   
    setEmail(email: string): void {
        this.email = email;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    setNivelAcesso(nivelAcesso: string): void {
        this.nivelAcesso = nivelAcesso;
    }

    setDataCadastro(dataCadastro: Date): void {
        this.dataCadastro = dataCadastro;
    }

  
    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, 10); 
    }

  
    async checkPassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export default User;
