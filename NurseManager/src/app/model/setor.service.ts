import {Injectable} from '@angular/core';

import {Setor} from './setor';
import { Turno } from './turno';
import { Enfermeiro } from './enfermeiro';

@Injectable()
export class SetorService{
    setores : Setor[] = [];

    criar(setor :Setor) : Setor{
        setor = setor.clone();
        var result = null;
        if (this.setorNaoCadastrado(setor.especialidadeSetor)){
            this.setores.push(setor);
            result = setor;
        }
        console.log(this.setores);
        return result;
        
    }

    setorNaoCadastrado(especialidade : string) : boolean{
        return !this.setores.find(a => a.especialidadeSetor == especialidade);
    }

    getSetores(): Setor[]{
        var result : Setor[]= [];
        for( let a of this.setores){
            result.push(a.clone());
        }
        return result;
    }

    atualizaSetor(setornome: String, turnonome : string,enf : Enfermeiro){
        this.setores.find(setor => setor.especialidadeSetor == setornome).turnoList.find(turno => turno.nome == turnonome).enfermeiroList.push(enf);
        var size:number = this.setores.find(setor => setor.especialidadeSetor == setornome).turnoList.find(turno => turno.nome == turnonome).enfermeiroList.length;
        if(size > this.setores.find(setor => setor.especialidadeSetor == setornome).turnoList.find(turno => turno.nome == turnonome).maximumPop){
            alert(`O setor ${setornome}, no turno ${turnonome} possui mais enfermeiros do que o necessario`);
        }
    }
}