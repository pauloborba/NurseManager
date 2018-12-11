import { EnfermeiroService } from './enfermeiro.service';
import { Ranker } from './ranker';
import { Enfermeiro } from './enfermeiro';
import { Sugestao } from './sugestao';
import { Setor } from './setor';
import { Turno } from './turno';

export class SugestaoHandler {
    //gera e guarda uma lista de enfermeiros ordenados por ranking
    sugestaoList: Sugestao;
    //classe que calcula o ranking
    ranker: Ranker;   

    constructor(
        private enfermeiroService: EnfermeiroService
    ) {

    }

    //para cada enfermeiro cadastrado, calcula o ranking e adiciona em uma lista de enfermeiros ordenados por ranking
    getSugestaoList(setor: Setor, turno: Turno): Sugestao {
      var enfermeiroList: Enfermeiro[] = this.enfermeiroService.getEnfermeiros();
      var enfermeiroRanqueado: [Enfermeiro, number];
      for (let e of enfermeiroList) {
         enfermeiroRanqueado = [e, this.ranker.getRanking(e, setor, turno.nome)];
         this.sugestaoList.push(enfermeiroRanqueado);
      }
      this.sugestaoList.sort();
      return this.sugestaoList;
    }

}