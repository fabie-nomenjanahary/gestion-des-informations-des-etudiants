import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniteEnseignementRoutingModule } from './unite-enseignement-routing.module';
import { UniteEnseignementListComponent } from './components/unite-enseignement-list/unite-enseignement-list.component';
import { UniteEnseignementDialogComponent } from './components/unite-enseignement-dialog/unite-enseignement-dialog.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    UniteEnseignementListComponent,
    UniteEnseignementDialogComponent
  ],
  imports: [
    CommonModule,
    UniteEnseignementRoutingModule,
    CustomModule
  ],
  exports: [
    UniteEnseignementListComponent,
    UniteEnseignementDialogComponent
  ]
})
export class UniteEnseignementModule { }
