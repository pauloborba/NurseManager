import {Component, OnInit} from '@angular/core';
import {NgModule} from '@angular/core';

import {Setor} from './setor';
import {SetorService} from './setor.service';

@Component({
    selector:'app-root',
    templateUrl:'./setor.component.html',
    styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit{
    constructor (private setorService: SetorService) {}

    setor: Setor = new Setor();
    setores : Setor[];
    setorExistente : boolean  = false;

    criarSetor(a: Setor) : void{
        if(this.setorService.criar(a)){
            this.setores.push(a);
            this.setor = new Setor();
        }else{
            this.setorExistente =true;
        }
    }

    onMove(): void{
        this.setorExistente = false;
    }

    ngOnInit(): void{
        this.setores = this.setorService.getSetores();
    }


}