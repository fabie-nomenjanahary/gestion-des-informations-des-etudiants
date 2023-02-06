import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NiveauRoutingModule } from './niveau-routing.module';
import { NiveauDialogComponent } from './components/niveau-dialog/niveau-dialog.component';
import { NiveauListComponent } from './components/niveau-list/niveau-list.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    NiveauDialogComponent,
    NiveauListComponent
  ],
  imports: [
    CommonModule,
    NiveauRoutingModule,
    CustomModule
  ],
  exports: [
    NiveauDialogComponent,
    NiveauListComponent
  ],
})
export class NiveauModule { }
