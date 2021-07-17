import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'contas';
  constructor(private auth: AuthService, private router: Router) { }

  logout() {
    this.auth.logout()
      .then(() => {
        this.router.navigate(['login'])
      })
  }
}
