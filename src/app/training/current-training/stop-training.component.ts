import { Component } from '@angular/core';

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>정말 그만두시겠습니까?</h1>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">네. 그만둘게요.</button>
      <button mat-raised-button [mat-dialog-close]="false">아뇨. 계속 운동해볼게요!</button>
    </mat-dialog-actions>`
})
export class StopTrainingComponent {

}
