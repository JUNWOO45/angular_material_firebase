import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule]
})
export class MaterialModule {}
