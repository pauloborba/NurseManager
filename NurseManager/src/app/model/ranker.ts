import { Enfermeiro } from './enfermeiro';
import { Setor } from './setor';

export class Ranker {
    
    getRanking(enfermeiro: Enfermeiro, setor: Setor, turno: string): number {
        var ranking: number = 0;
        var titulacao: string[] = enfermeiro.especialidadeList;
        var especializacao: string[] = enfermeiro.titulacaoList;
        //se o enfermeiro está disponível no turno, calcula seu ranking para o turno
        if(enfermeiro.turno == turno){ 
            for(let e of especializacao){
                if(e == setor.especialidadeSetor){
                    ranking = ranking + 2;
                }
            }
            for(let t of titulacao){
                if(t == setor.especialidadeSetor){
                    ranking = ranking + 1,5;
                }
            }
        }
        return ranking;
      }
  

}