import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule, MatSidenavModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule]
})
export class MaterialModule {}
