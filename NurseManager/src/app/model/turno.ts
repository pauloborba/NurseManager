import { SugestaoHandler } from '../Sugestao/sugestao.handler';
import {Enfermeiro} from './enfermeiro';

export class Turno {
    enfermeiroList : Enfermeiro[];
    minimumPop: number;
    maximumPop: number;
    nome: string;

   
    constructor(nome: string){
        this.clean();
        this.nome = nome;
    }

    clean(): void{
        this.nome = "";
        this.enfermeiroList = [];
        this.minimumPop = 0;
        this.maximumPop = 0;
    }
}