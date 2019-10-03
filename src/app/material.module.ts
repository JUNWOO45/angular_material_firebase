import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule]
})
export class MaterialModule {}
