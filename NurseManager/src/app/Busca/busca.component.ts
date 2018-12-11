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
    ) {
        this.nameSelect = "";
        this.specSelect = "";
        this.sectorSelect = "";
        this.shiftSelect = "";
        this.liaisonSelect = "";
    }

    checkOrTrueIfEmpty (enf: Enfermeiro, term: string, callback){
        if (term.length > 0){
            return callback(enf,term);
        } else {
            return true;
        }
    }

    nameFilter = ((enf: Enfermeiro, term: string) => enf.nome.includes(term));
    specFilter = ((enf: Enfermeiro, term: string) => enf.especialidadeList.some(spec => spec.nome === term));
    sectorFilter = ((enf: Enfermeiro, term: string) => enf.setor.especialidadeSetor === term);
    shiftFilter = ((enf: Enfermeiro, term: string) => enf.turno.nome === term);
    liaisonFilter = ((enf: Enfermeiro, term: string) => enf.vinculo === term);

    checks(enf: Enfermeiro): boolean[]{
        return [
            this.checkOrTrueIfEmpty(enf, this.nameSelect, this.nameFilter),
            this.checkOrTrueIfEmpty(enf, this.specSelect, this.specFilter),
            this.checkOrTrueIfEmpty(enf, this.sectorSelect, this.sectorFilter),
            this.checkOrTrueIfEmpty(enf, this.shiftSelect, this.shiftFilter),
            this.checkOrTrueIfEmpty(enf, this.liaisonSelect, this.liaisonFilter),
        ]
    }

    reducer = ((a,b) => a && b);

    onSearch(): void {
        this.filtList = this.enfList.filter(enf => this.checks(enf).reduce(this.reducer));
    }

    ngOnInit(): void{
        this.enfList = this.enfService.getEnfermeiros();
        this.feedOptions();
        this.onSearch();
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