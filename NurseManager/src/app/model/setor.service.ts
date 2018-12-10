import {Injectable} from '@angular/core';

import {Setor} from './setor';

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
}