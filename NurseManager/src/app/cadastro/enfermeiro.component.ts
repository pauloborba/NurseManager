import { Component, OnInit} from '@angular/core';
import { NgModule} from '@angular/core';

import {Enfermeiro} from '../model/enfermeiro';
import {EnfermeiroService} from '../model/enfermeiro.service';

@Component({
    selector: 'app-root',
    templateUrl: './enfermeiros.component.html',
    styleUrls : ['./enfermeiros.component.css']
})
export class EnfermeiroComponent implements OnInit{
    constructor(private enfermeiroService : EnfermeiroService){};

    enfermeiro : Enfermeiro = new Enfermeiro();
    enfermeiros :Enfermeiro[];
    
    criarEnfermeiro(a : Enfermeiro) :void{
        if (this.enfermeiroService.criar(a)){
            this.enfermeiros.push(a);
            this.enfermeiro = new Enfermeiro();
        }
    }
    ngOnInit(): void{
        this.enfermeiros = this.enfermeiroService.getEnfermeiros();
    
    }

    onMove():void{}
}



