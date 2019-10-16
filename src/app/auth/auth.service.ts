import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private user: User;

  constructor(private router: Router, private afAuth: AngularFireAuth) {

  }

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password
      ).then(result => {
        console.log('result : ', result);
        this.successfullyAuth();
      })
      .catch(error => {
        console.log('error : ', error);
      })

    this.successfullyAuth();
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString()
    // };
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log('result : ', result);
      this.successfullyAuth();
    })
    .catch(error => {
      console.log('error : ', error);
    })

    this.successfullyAuth();
  }

  logout() {
    this.user = null;

    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  getUser() {
    return {...this.user}
  }

  isAuth() {
    return this.user != null;
  }

  private successfullyAuth() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
  }
}