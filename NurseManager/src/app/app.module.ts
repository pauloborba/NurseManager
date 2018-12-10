import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {EnfermeiroComponent} from './model/enfermeiro.component';
import {EnfermeiroService} from './model/enfermeiro.service';
import {SetorService} from './model/setor.service';
import {SetorComponent} from './model/setor.component'
import { BuscaComponent } from './Busca/busca.component';

@NgModule({
  declarations: [
    AppComponent,
    EnfermeiroComponent,
    SetorComponent,
    BuscaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path : 'enfermeiros',
        component:EnfermeiroComponent
      },
      {
        path: "setores",
        component : SetorComponent
      },
      {
        path: 'busca',
        component: BuscaComponent
      }
    ])
  ],
  providers: [EnfermeiroService,SetorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
