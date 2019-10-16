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
        this.openSnackBar('회원가입에 실패했습니다. 다시 한 번 시도해주세요.', '확인');
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
      this.openSnackBar('잘못된 이메일이나 비밀번호입니다.', '확인');
    })
  }

  logout() {
    this.openSnackBar('로그인을 한 뒤 서비스를 이용할 수 있습니다.', '확인');
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}