import { Especialidade } from "./especialidade";
import { Turno } from "./turno";
import { Setor } from "./setor";

export class Enfermeiro {
    setor: Setor;
    turno: Turno;
    especialidadeList: Especialidade[];
    titulacaoList: string[];
    nome: string;
    vinculo: string;
    disponibilidade: string;
    horasDict: number;
    dataAtualizacao: Date;
    experiencia: number;
    ranking: number;
    constructor(){
        this.clean();
    }

    clean() : void{
        this.setor = null;
        this.turno = null;
        this.especialidadeList = [];
        this.especialidadeList.push(new Especialidade());
        this.titulacaoList = [];
        this.titulacaoList.push("");
        this.nome = "";
        this.vinculo ="";
        this.disponibilidade = "";
        this.horasDict = 0;
        this.dataAtualizacao = new Date("2012-12-21");
        this.experiencia = 0;
        this.ranking = 0;

    }

    clone() : Enfermeiro{
        var enfermeiro: Enfermeiro = new Enfermeiro();
        enfermeiro.setor  = this.setor;
        enfermeiro.turno = this.turno;
        enfermeiro.especialidadeList = this.especialidadeList;
        enfermeiro.titulacaoList = this.titulacaoList;
        enfermeiro.nome = this.nome;
        enfermeiro.vinculo = this.vinculo;
        enfermeiro.disponibilidade = this.disponibilidade;
        enfermeiro.horasDict = this.horasDict;
        enfermeiro.dataAtualizacao = this.dataAtualizacao;
        enfermeiro.experiencia = this.experiencia;
        enfermeiro.ranking = this.ranking;
        return enfermeiro;
    }
}

