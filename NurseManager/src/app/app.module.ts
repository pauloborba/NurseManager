import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import { AppComponent } from './app.component';
import {EnfermeiroComponent} from './model/enfermeiro.component';
import {EnfermeiroService} from './model/enfermeiro.service';

@NgModule({
  declarations: [
    AppComponent,
    EnfermeiroComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path : 'enfermeiros',
        component:EnfermeiroComponent
      }
    ])
  ],
  providers: [EnfermeiroService],
  bootstrap: [AppComponent]
})
export class AppModule { }
