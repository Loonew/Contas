import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Login } from '../models/Login.models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afa: AngularFireAuth) {}

    login(login: Login){
      return this.afa.signInWithEmailAndPassword(login.email, login.senha)
    }
    
    logout(){
      return  this.afa.signOut()
    }
}
