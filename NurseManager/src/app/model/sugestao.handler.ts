import { EnfermeiroMng } from './enfermeiro.mng';
import { EnfermeiroService } from './enfermeiro.service';
import { Ranker } from './ranker';
import { Enfermeiro } from './enfermeiro';
import { Sugestao } from './sugestao';

export class SugestaoHandler {
    //gera e guarda uma lista de enfermeiros ordenados por ranking
    sugestaoList: Sugestao;
    //classe que calcula o ranking
    ranker: Ranker;   

    //para cada enfermeiro cadastrado, calcula o ranking e adiciona em uma lista de enfermeiros ordenados por ranking
    getSugestaoList(enfermeiroList: Enfermeiro[]): Sugestao {
      var enfermeiroRanqueado: [Enfermeiro, number];
      for (let e of enfermeiroList) {
         enfermeiroRanqueado = [e, this.ranker.getRanking(e)];
         this.sugestaoList.push(enfermeiroRanqueado);
      }
      this.sugestaoList.sort();
      return this.sugestaoList;
    }

}