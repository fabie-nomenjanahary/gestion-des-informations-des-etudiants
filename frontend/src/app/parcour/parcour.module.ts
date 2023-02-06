import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParcourRoutingModule } from './parcour-routing.module';
import { ParcourListComponent } from './components/parcour-list/parcour-list.component';
import { ParcourDialogComponent } from './components/parcour-dialog/parcour-dialog.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    ParcourListComponent,
    ParcourDialogComponent
  ],
  imports: [
    CommonModule,
    ParcourRoutingModule,
    CustomModule
  ],
  exports: [
    ParcourListComponent,
    ParcourDialogComponent
  ]
})
export class ParcourModule { }
