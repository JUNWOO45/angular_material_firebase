import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule],
  exports: [MatButtonModule, MatSliderModule]
})
export class MaterialModule {}
