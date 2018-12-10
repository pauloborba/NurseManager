import { Turno } from './turno';

export class Setor {
    turnoList: Turno[];
    especialidadeSetor : string;

    

    constructor(){
        this.clean();      
        
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
    
    // stringTurnos(): string[]{
    //     var turnos : string[]= [];
    //     for(let turno of this.turnoList){
    //         turnos.push(turno.nome);
    //     }
    //     return turnos;
    // }

    
}