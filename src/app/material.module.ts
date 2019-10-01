import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule]
})
export class MaterialModule {}
