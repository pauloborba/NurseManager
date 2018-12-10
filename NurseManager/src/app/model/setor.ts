import { Turno } from './turno';

export class Setor {
    turnoList: Turno[];
    especialidadeSetor : string;

    

    constructor(manha?:number, tarde?:number, diurno?:number, noturno?:number){
        if(manha || tarde||diurno||noturno){
            this.turnoList[0].minimumPop = manha;
            this.turnoList[1].minimumPop = tarde;
            this.turnoList[2].minimumPop = diurno;
            this.turnoList[3].minimumPop = noturno;
        }
        else{
            this.clean();
        }
        
    }

    clean() : void{
        this.especialidadeSetor = "";
        this.turnoList = [];
    }
    clone() : Setor{
        var setor : Setor = new Setor();
        setor.especialidadeSetor = this.especialidadeSetor;
        setor.turnoList =this.cloneTurnos() ;
        return setor;
    }

    cloneTurnos(): Turno[]{
        var turnos : Turno[]= [];
        for(let key in this.turnoList){
            turnos[key] = this.turnoList[key];
        }
        return turnos;
    }
    

    
}