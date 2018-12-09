import { Injectable} from '@angular/core';

import { Enfermeiro} from './enfermeiro';

@Injectable()
export class EnfermeiroService{
    enfermeiros : Enfermeiro[] = [];

    criar(enfermeiro : Enfermeiro) : Enfermeiro{
        enfermeiro = enfermeiro.clone();
        this.enfermeiros.push(enfermeiro);
        return enfermeiro;
    }

    getEnfermeiros() : Enfermeiro[] {
        var result: Enfermeiro[] = [];
        for(let a of this.enfermeiros){
            result.push(a.clone());
        }
        return result;
    }
}