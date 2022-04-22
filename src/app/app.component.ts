import { Component } from '@angular/core';
import { User } from './_models/user';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: User;

  public appPages = [
    { title: 'Home', url: '/home', icon: 'people' },      
  ];
  
  constructor(
    //private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
    this.authenticationService.logout();
  }
}
