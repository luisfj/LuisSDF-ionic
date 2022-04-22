import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CadastroPessoaPageRoutingModule } from './cadastro-pessoa-routing.module';

import { CadastroPessoaPage } from './cadastro-pessoa.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastroPessoaPageRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [CadastroPessoaPage]
})
export class CadastroPessoaPageModule {}
