import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'endereco' })
class Endereco {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  UF: string;

  @Column()
  cidade: string;

  @Column()
  bairro: string;

  @Column()
  rua: string;

  @Column()
  numero: number;

  @Column()
  comp: string;

  @Column()
  cep: string;

  constructor(
    UF: string,
    cidade: string,
    bairro: string,
    rua: string,
    numero: number,
    comp: string,
    cep: string
  ) {
    this.UF = UF;
    this.cidade = cidade;
    this.bairro = bairro;
    this.rua = rua;
    this.numero = numero;
    this.comp = comp;
    this.cep = cep;
  }


  getUF(): string {
    return this.UF;
  }

  getCidade(): string {
    return this.cidade;
  }

  getBairro(): string {
    return this.bairro;
  }

  getRua(): string {
    return this.rua;
  }

  getNumero(): number {
    return this.numero;
  }

  getComp(): string {
    return this.comp;
  }

  getCep(): string {
    return this.cep;
  }


  setUF(UF: string): void {
    this.UF = UF;
  }

  setCidade(cidade: string): void {
    this.cidade = cidade;
  }

  setBairro(bairro: string): void {
    this.bairro = bairro;
  }

  setRua(rua: string): void {
    this.rua = rua;
  }

  setNumero(numero: number): void {
    this.numero = numero;
  }

  setComp(comp: string): void {
    this.comp = comp;
  }

  setCep(cep: string): void {
    this.cep = cep;
  }
}

export default Endereco;
