import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroPessoaPage } from './cadastro-pessoa.page';

const routes: Routes = [
  {
    path: '',
    component: CadastroPessoaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastroPessoaPageRoutingModule {}
