import { Component, OnInit} from '@angular/core';
import { NgModule} from '@angular/core';

import {Enfermeiro} from './model/enfermeiro';
import {EnfermeiroService} from './model/enfermeiro.service';
import { SetorService } from './model/setor.service';
import { Setor } from './model/setor';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls : ['./app.component.css']
})
export class AppComponent {
    constructor(private enfermeiroService : EnfermeiroService, private setorService : SetorService){};

    enfermeiro : Enfermeiro = new Enfermeiro();
    enfermeiros :Enfermeiro[];
    
    criarEnfermeiro(a : Enfermeiro) :void{
        if (this.enfermeiroService.criar(a)){
            this.enfermeiros.push(a);
            this.enfermeiro = new Enfermeiro();
        }
    }


    setor : Setor = new Setor();
    setores : Setor[];

    criarSetor(a : Setor) : void{
        if(this.setorService.criar(a)){
            this.setores.push(a);
            this.setor = new Setor();
        }
    }
   
}