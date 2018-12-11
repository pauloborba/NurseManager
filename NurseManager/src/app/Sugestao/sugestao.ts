import { Enfermeiro } from "../model/enfermeiro";

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
        //define o critério de desempate      
        for(var i = 0; i < this.sugestaoList.length-1; i++){
            //se um tiver o mesmo ranking que o próximo
            if(this.sugestaoList[i][1] == this.sugestaoList[i+1][1]){
                //e tiver menos anos de experiencia
                if(this.sugestaoList[i][0].experiencia < this.sugestaoList[i+1][0].experiencia){
                    //o com mais experiência fica mais à frente
                    var swap = this.sugestaoList[i];
                    this.sugestaoList[i] = this.sugestaoList[i+1];
                    this.sugestaoList[i+1] = swap;
                }
            }
        } 
    }
}