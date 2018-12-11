import { Enfermeiro } from '../model/enfermeiro';
import { Setor } from '../model/setor';
import { Turno } from '../model/turno';

export class Ranker {
    
    getRanking(enfermeiro: Enfermeiro, setor: Setor, turno: string): number {
        var ranking: number = 0;
        var titulacao: string[] = enfermeiro.titulacaoList;
        var especializacao: string[];
        for(let e of enfermeiro.especialidadeList){
            especializacao.push(e.nome);
        }
        //se o enfermeiro está disponível no turno, calcula seu ranking para o turno
        if(enfermeiro.turno.nome == turno){ 
            for(let e of especializacao){
                if(e == setor.especialidadeSetor){
                    ranking = ranking + 2;
                }
            }
            for(let t of titulacao){
                if(t == setor.especialidadeSetor){
                    ranking = ranking + 2;
                }
            }
            ranking = ranking + enfermeiro.experiencia;
        }
        return ranking;
      }
  

}