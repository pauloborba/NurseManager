import { Component, OnInit} from '@angular/core';
import { NgModule} from '@angular/core';

import {Enfermeiro} from '../model/enfermeiro';
import {EnfermeiroService} from '../model/enfermeiro.service';
import { Setor } from '../model/setor';
import { SetorService } from '../model/setor.service';
import { Turno } from '../model/turno';

@Component({
    selector: 'app-root',
    templateUrl: './enfermeiros.component.html',
    styleUrls : ['./enfermeiros.component.css']
})
export class EnfermeiroComponent implements OnInit{
    constructor(
        private enfermeiroService : EnfermeiroService,
        private setorService: SetorService
    ) {};

    enfermeiro : Enfermeiro = new Enfermeiro();
    enfermeiros :Enfermeiro[];

    setorSelect: string;
    setorOption: string[];
    turnoSelect: string;
    turnoOption: string[];
    vinculoSelect: string;
    vinculoOption: string[];
    
    criarEnfermeiro(a : Enfermeiro) :void{
        var setor: Setor = this.setorService.getSetores().find(setor => setor.especialidadeSetor == this.setorSelect);
        var turno: Turno = setor.turnoList[this.turnoOption.indexOf(this.turnoSelect)];
        this.enfermeiro.setor = setor;
        this.enfermeiro.turno = turno;
        this.enfermeiro.vinculo = this.vinculoSelect;

        if (this.enfermeiroService.criar(a)){
            this.enfermeiros.push(a);
            this.setorService.atualizaSetor(this.setorSelect, this.turnoSelect,a);
            this.enfermeiro = new Enfermeiro();
        }
    }
    ngOnInit(): void{
        this.enfermeiros = this.enfermeiroService.getEnfermeiros();
        this.feedOptions();
    }

    onMove():void{}

    feedOptions():void{
        this.setorOption = [""];
        for (let setor of this.setorService.getSetores()){
            this.setorOption.push(setor.especialidadeSetor);
        }

        this.turnoOption = ["Turno Manhã","Turno Tarde","Plantão Diurno","Plantão Noturno"];

        this.vinculoOption = ["CLT","RJU"];
    }
}



