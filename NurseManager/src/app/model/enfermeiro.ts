export class Enfermeiro {
    setor;
    turno;
    especialidadeList;
    titulacaoList;
    nome: string;
    vinculo: string;
    disponibilidade;
    horasDict: number;
    dataAtualizacao: Date;
    constructor(){
        this.clean();
    }

    clean() : void{
        this.setor = null;
        this.turno = null;
        this.especialidadeList = null;
        this.titulacaoList = null;
        this.nome = "";
        this.vinculo ="";
        this.disponibilidade = null;
        this.horasDict = null;
        this.dataAtualizacao = null

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
        return enfermeiro;
    }
}

