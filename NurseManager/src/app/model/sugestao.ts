import { Enfermeiro } from "./enfermeiro";

export class Sugestao {
    sugestaoList: Array<[Enfermeiro, number]>;
    Sugestao(sL: Array<[Enfermeiro, number]>){
        this.sugestaoList = sL;
    }

    push(enfermeiroRanqueado: [Enfermeiro, number]){
        this.sugestaoList.push(enfermeiroRanqueado);
    }
    //sorta pelo atributo ranking da tupla
    sort(){
        this.sugestaoList.sort(function(a, b) {
            if (a[1] === b[1]) {
              return 0;
            }
            else {
              return (a[1] < b[1]) ? -1 : 1;
            }
           });
    }
}