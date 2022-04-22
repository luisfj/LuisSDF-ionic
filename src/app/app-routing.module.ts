import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
    
  {
    path: 'login', loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule), canActivate: [AuthGuard]
  },  
  {
    path: 'cadastro-pessoa', loadChildren: () => import('./cadastro-pessoa/cadastro-pessoa.module').then( m => m.CadastroPessoaPageModule), canActivate: [AuthGuard]
  },  
  {
    path: 'git', loadChildren: () => import('./git/git.module').then( m => m.GitPageModule)
  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
