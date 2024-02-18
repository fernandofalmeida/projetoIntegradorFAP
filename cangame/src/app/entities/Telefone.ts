import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import Contrato from './Contrato';

@Entity({ name: 'telefone' })
class Telefone {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  numero: string;

  @ManyToOne(() => Contrato,  { eager: true } )
  @JoinColumn({ name: 'contratoId' })
  contrato: Contrato;

  constructor(
    numero: string,
    contrato: Contrato
  ) {
    this.numero = numero;
    this.contrato = contrato;
    
  }

  getNumero(): string {
    return this.numero;
  }

  setUF(numero: string): void {
    this.numero = numero;
  }

}

export default Telefone;
