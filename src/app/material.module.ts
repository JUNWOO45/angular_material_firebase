import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule]
})
export class MaterialModule {}
