import { Subject } from 'rxjs/Subject';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router, 
    private afAuth: AngularFireAuth, 
    private trainingService: TrainingService,
    private _snackBar: MatSnackBar
    ) {

  }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if(user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.afAuth.auth.createUserWithEmailAndPassword(
      authData.email, 
      authData.password
      ).then(result => {
        console.log('result : ', result);
      })
      .catch(error => {
        console.log('error : ', error);
        this.openSnackBar(error.message, '확인');
      })
  }

  login(authData: AuthData) {
    this.afAuth.auth.signInWithEmailAndPassword(
      authData.email,
      authData.password
    ).then(result => {
      console.log('result : ', result);
    })
    .catch(error => {
      console.log('error : ', error);
      this.openSnackBar(error.message, '확인');
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  openSnackBar(errorMessage: string, action: string) {
    let message;
    if(errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
      message = "잘못된 이메일 정보입니다."
    } else if(errorMessage = "The password is invalid or the user does not have a password.") {
      message = "비밀번호가 틀렸습니다."
    } else if(errorMessage = "The email address is already in use by another account.") {
      message = "이미 가입된 이메일입니다."
    }
    
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}