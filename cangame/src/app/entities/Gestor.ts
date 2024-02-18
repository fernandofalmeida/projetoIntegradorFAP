import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Contrato from './Contrato';

@Entity({ name: 'gestor' })
class Gestor {
  
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome: string;

    @Column()
    cargo: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @ManyToOne(() => Contrato,  { eager: true })
    @JoinColumn({ name: 'contratoId' })
    contrato: Contrato;

  constructor(nome: string, cargo: string, email: string, telefone: string, contrato: Contrato) {
    this.nome = nome;
    this.cargo = cargo;
    this.email = email;
    this.telefone = telefone;
    this.contrato = contrato;
  }


  getNome(): string {
    return this.nome;
  }

  setNome(nome: string): void {
    this.nome = nome;
  }

  getCargo(): string {
    return this.cargo;
  }

  
  setCargo(cargo: string): void {
    this.cargo = cargo;
  }
  
  getEmail(): string {
    return this.email;
  }
  
  setEmail(email: string): void {
    this.email = email;
  }

  getTelefone(): string {
    return this.telefone;
  }
 
  setTelefone(telefone: string): void {
    this.telefone = telefone;
  }

  getContrato(): Contrato {
    return this.contrato;
}

  setContrato(contrato: Contrato): void {
    this.contrato = contrato;
}
}

export default Gestor;
