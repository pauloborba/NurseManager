import { SugestaoHandler } from './sugestao.handler';
import {Enfermeiro} from './enfermeiro';

export class Turno {
    enfermeiroList : Enfermeiro[];
    minimumPop: number;
    maximumPop: number;
    nome :  string;

   
    constructor(minimo?: number ){
        if(minimo){
        this.enfermeiroList = [];
        this.minimumPop = minimo;
        this.maximumPop = null;
        } else this.clean();
    }

    clean(): void{
        this.enfermeiroList = [];
        this.minimumPop = null;
        this.maximumPop = null;

    }
}