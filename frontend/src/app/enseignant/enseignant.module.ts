import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnseignantRoutingModule } from './enseignant-routing.module';
import { EnseignantDialogComponent } from './components/enseignant-dialog/enseignant-dialog.component';
import { EnseignantListComponent } from './components/enseignant-list/enseignant-list.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    EnseignantDialogComponent,
    EnseignantListComponent
  ],
  imports: [
    CommonModule,
    EnseignantRoutingModule,
    CustomModule
  ],
  exports: [
    EnseignantDialogComponent,
    EnseignantListComponent
  ],
})
export class EnseignantModule { }
