import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'administrador' })
class Administrador {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  nome: string;

  @Column()
  cargo: string;

  constructor(
    nome: string,
    cargo: string,
    
  ) {
    this.nome = nome;
    this.cargo = cargo;
  }

  
  getNome(): string {
    return this.nome;
  }

  getCargo(): string {
    return this.cargo;
  }


  setNome(nome: string): void {
    this.nome = nome;
  }

  setCargo(cargo: string): void {
    this.cargo = cargo;
  }
}

export default Administrador;
