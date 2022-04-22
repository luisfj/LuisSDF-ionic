import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../_services/auth.service';
import { AlertController } from '@ionic/angular';
import { ErrorMessage } from '../_models/ErrorMessage';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthService,
        private alertCtrl : AlertController
        ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if(!err.status){
                err = JSON.parse(err);
            }
            if (err.status === 401) {
                // auto logout se a resposta da api for 401
                this.authenticationService.logout();
            }

            console.warn(err);
            
            switch (err.status) {
                case 417:
                    this.handle417(err.error)
                    return null;
                    break;
            
                default:
                    break;
            }             
            return Observable.throw(err);
        }))
    }

    async handle417(errors){
        errors = JSON.parse(errors);
        
        const alert = await this.alertCtrl.create({
            header: "Erro de validação!",
            message: this.listErrors(errors.violations),
            backdropDismiss: false,
            buttons: ["Ok"]
        });
        alert.present();
    }

    private listErrors(errors : ErrorMessage[]) : string{        
        let err : string = '';
        for(var i=0; i<errors.length; i++){
            err = err + '<p><strong>' + errors[i].fieldName + '</strong>: ' + errors[i].message + '</p>';
        }

        return err;
    }
}