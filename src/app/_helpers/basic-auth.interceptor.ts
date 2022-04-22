import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';
import { API_CONFIG } from '../_config/api.config';


@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const user = this.authenticationService.userValue;
        const isLoggedIn = user && user.authdata;
        const isApiUrl = request.url.startsWith(API_CONFIG.baseUrl);

        if (isLoggedIn && isApiUrl) {
            console.log('adicionando header com o basic auth');
            request = request.clone({
                setHeaders: { 
                    Authorization: `Basic ${user.authdata}`     
                }
            });
        }

        return next.handle(request);
    }
}

