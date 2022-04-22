import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error-interceptor';
import { AuthService } from './_services/auth.service';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { PessoaService } from './_services/pessoa.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [    
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService, PessoaService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
