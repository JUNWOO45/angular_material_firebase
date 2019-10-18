import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class UIService {
  loadingStateChanged = new Subject<boolean>();

  constructor(private _snackBar: MatSnackBar) {

  }

  openSnackBar(errorMessage: string, action: string, duration: number) {
    let message;
    if(errorMessage === "There is no user record corresponding to this identifier. The user may have been deleted.") {
      message = "잘못된 이메일 정보입니다.";
    } else if(errorMessage === "The password is invalid or the user does not have a password.") {
      message = "비밀번호가 틀렸습니다.";
    } else if(errorMessage === "The email address is already in use by another account.") {
      message = "이미 사용중인 이메일입니다.";
    } else if(errorMessage === '데이터를 불러오지 못했습니다. 다시 시도해주세요') {
      message = "데이터를 불러오지 못했습니다. 다시 시도해주세요.";
    }
    this._snackBar.open(message, action, {
      duration
    });
  }
}
