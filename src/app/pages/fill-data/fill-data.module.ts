import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FillDataPageRoutingModule } from './fill-data-routing.module';

import { FillDataPage } from './fill-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FillDataPageRoutingModule
  ],
  declarations: [FillDataPage]
})
export class FillDataPageModule {}
