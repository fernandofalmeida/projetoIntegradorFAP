
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Contrato from './Contrato';



@Entity({ name: 'licenca' })
class Licenca {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    total: number;

    @Column()
    utilizadas: number;

    @Column()
    disponivel: number;

    @Column({ type: 'timestamp' })
    dataAquisicao: Date;

    @Column({ type: 'timestamp' })
    dataExpiracao: Date;


    @ManyToOne(() => Contrato, { eager: true }) 
    @JoinColumn({ name: 'contratoId' })
    contrato: Contrato;
  

    constructor(
        total: number,
        utilizadas: number,
        disponivel: number,
        dataAquisicao: Date,
        dataExpiracao: Date,
        contrato: Contrato

    ) {
        this.total = total;
        this.utilizadas = utilizadas;
        this.disponivel = disponivel;
        this.dataAquisicao = dataAquisicao;
        this.dataExpiracao = dataExpiracao;
        this.contrato = contrato;
    }


    getId(): number | undefined {
        return this.id;
    }


    getTotal(): number {
        return this.total;
    }

    getUtilizadas(): number {
        return this.utilizadas;
    }

    getDisponivel(): number {
        return this.disponivel;
    }

    getDataAquisicao(): Date {
        return this.dataAquisicao;
    }

    getDataExpiracao(): Date {
        return this.dataExpiracao;
    }


    getContrato(): Contrato {
        return this.contrato;
    }

   
    setTotal(total: number): void {
        this.total = total;
    }

    setUtilizadas(utilizadas: number): void {
        this.utilizadas = utilizadas;
    }

    setDisponivel(disponivel: number): void {
        this.disponivel = disponivel;
    }

    setDataAquisicao(dataAquisicao: Date): void {
        this.dataAquisicao = dataAquisicao;
    }

    setDataExpiracao(dataExpiracao: Date): void {
        this.dataExpiracao = dataExpiracao;
    }


    setContrato(contrato: Contrato): void {
        this.contrato = contrato;
    }

}

export default Licenca;
