import { Turno } from './turno';

export class Setor {
    turnoList: Turno[];
    especialidadeSetor : string;

    

    constructor(){
        this.clean();
        this.turnoList = [];
        this.turnoList.push(new Turno("Turno Manhã"));
        this.turnoList.push(new Turno("Turno Tarde"));
        this.turnoList.push(new Turno("Plantão Diurno"));
        this.turnoList.push(new Turno("Plantão Noturno"));
    }

    clean() : void{
        this.especialidadeSetor = "";
        this.turnoList = [];
    }

    clone() : Setor{
        var setor : Setor = new Setor();
        setor.especialidadeSetor = this.especialidadeSetor;
        setor.turnoList = this.cloneTurnos();
        return setor;
    }

    cloneTurnos(): Turno[]{
        var turnos : Turno[] = [];
        for(let turno of this.turnoList){
            var turnoclone = new Turno(turno.nome);
            for (let enf of turno.enfermeiroList){
                turnoclone.enfermeiroList.push(enf);
            }
            turnoclone.maximumPop = turno.maximumPop;
            turnoclone.minimumPop = turno.minimumPop;
            turnos.push(turnoclone);
        }
        return turnos;
    }
}