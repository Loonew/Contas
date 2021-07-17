import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin: FormGroup

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.formLogin = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      senha: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])]
    })
  }



  login() {
    if (this.formLogin.valid) {
      this.auth.login(this.formLogin.value)
        .then((user) => {
          console.log(user)
          this.router.navigate(['cadastro'])
        })
        .catch((error) => {
          console.log(error)
        })
    }



  }

}


