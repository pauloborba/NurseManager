import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Enfermeiro } from '../model/enfermeiro';
import { EnfermeiroService } from '../model/enfermeiro.service';
import { SetorService } from '../model/setor.service';

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
    specOption: string[];
    sectorSelect: string;
    sectorOption: string[];
    shiftSelect: string;
    shiftOption: string[];
    liaisonSelect: string;
    liaisonOption: string[];

    constructor(
        private enfService: EnfermeiroService,
        private setService: SetorService
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
            return enf.especialidadeList.some(spec => spec.nome === term);
        } else {
            return true;
        }
    }

    sectorFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.setor.especialidadeSetor === term;
        } else {
            return true;
        }
    }

    shiftFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.turno.nome === term;
        } else {
            return true;
        }
    }

    liaisonFilter(enf: Enfermeiro, term: string):boolean{
        if (term.length > 0){
            return enf.vinculo === term;
        } else {
            return true;
        }
    }

    onSearch(): void {
        this.filtList = this.enfList
        .filter(enf => this.nameFilter(enf,this.nameSelect))
        .filter(enf => this.specFilter(enf,this.specSelect))
        .filter(enf => this.sectorFilter(enf,this.sectorSelect))
        .filter(enf => this.shiftFilter(enf,this.shiftSelect))
        .filter(enf => this.liaisonFilter(enf,this.liaisonSelect));
    }

    ngOnInit(): void{
        this.enfList = this.enfService.getEnfermeiros();
        this.feedOptions();
    }

    listSpecs(specs):string{
        var result = "";
        result = result.concat(specs[0].nome);
        for(let i = 1; i < specs.length; i++){
            result = result.concat(`;${specs[i].nome}`);
        }
        return result;
    }

    feedOptions() {
        var specs = [""];
        for (let enf of this.enfList) {
            for (let spec of enf.especialidadeList){
                if (!specs.includes(spec.nome)) specs.push(spec.nome);
            }
        }
        this.specOption = specs;

        var sectors = [""];
        for(let sector of this.setService.getSetores()){
            sectors.push(sector.especialidadeSetor);
        }
        this.sectorOption = sectors;

        this.shiftOption = ["","Turno Manhã","Turno Tarde","Plantão Diurno","Plantão Noturno"];

        this.liaisonOption = ["","CLT","RJU"];
    }
}