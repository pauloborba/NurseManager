import { EnfermeiroService } from '../model/enfermeiro.service';
import { Ranker } from './ranker';
import { Enfermeiro } from '../model/enfermeiro';
import { Sugestao } from './sugestao';
import { Setor } from '../model/setor';
import { Turno } from '../model/turno';

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