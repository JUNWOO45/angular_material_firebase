import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule]
})
export class MaterialModule {}
