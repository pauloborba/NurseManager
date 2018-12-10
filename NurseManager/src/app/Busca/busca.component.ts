import { Component, OnInit} from '@angular/core';
import { NgModule} from '@angular/core';

import {Enfermeiro} from '../Model/enfermeiro';
import {EnfermeiroService} from '../Model/enfermeiro.service';

@Component({
    selector: 'busca',
    templateUrl: './busca.component.html'
})
export class BuscaComponent implements OnInit{
    er: string;
    enfList: Enfermeiro[];
    filtList: Enfermeiro[];

    nameSelect: string;
    specSelect: string;
    specList: string[];

    constructor(
        private enfService: EnfermeiroService
    ) {}

    nameFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.nome.includes(term);
        } else {
            return true;
        }
    }

    specFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.especialidadeList.find(spec => spec.nome === term);
        } else {
            return true;
        }
    }

    /*sectorFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.setor.especialidadeList .find(spec => spec.nome === term);
        } else {
            return true;
        }
    }*/

    onSearch(): void {
        this.filtList
    }

    ngOnInit(): void{
        this.enfList = this.enfService.getEnfermeiros();
    }
}