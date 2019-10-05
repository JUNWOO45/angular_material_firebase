import { NgModule } from '@angular/core';
import { MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule,MatDatepickerModule,MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatOptionModule } from '@angular/material'

@NgModule({
  imports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatOptionModule],
  exports: [MatButtonModule, MatSliderModule, MatCheckboxModule, MatIconModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatSidenavModule, MatToolbarModule, MatListModule, MatTabsModule, MatCardModule, MatSelectModule, MatOptionModule]
})
export class MaterialModule {}
