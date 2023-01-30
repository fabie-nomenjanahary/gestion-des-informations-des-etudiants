import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantDialogComponent } from './components/etudiant-dialog/etudiant-dialog.component';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    EtudiantDialogComponent,
    EtudiantListComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    CustomModule
  ],
  exports: [
    EtudiantDialogComponent,
    EtudiantListComponent
  ],
})
export class EtudiantModule { }
