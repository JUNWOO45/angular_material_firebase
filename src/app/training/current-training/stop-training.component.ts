import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-stop-training',
  template: `
    <h1 mat-dialog-title>정말 그만두시겠습니까?</h1>
    <mat-dialog-content>
      <div>이미 {{ passedData.progress }}%나 진행하셨군요!</div>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button [mat-dialog-close]="true">그만둘게요.</button>
      <button mat-raised-button [mat-dialog-close]="false">조금만 더 해볼래요!</button>
    </mat-dialog-actions>`
})
export class StopTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) private passedData: any) {

  }
}
