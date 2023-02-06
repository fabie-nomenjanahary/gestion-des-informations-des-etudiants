import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonneRoutingModule } from './personne-routing.module';
import { PersonneDialogComponent } from './components/personne-dialog/personne-dialog.component';
import { PersonneListComponent } from './components/personne-list/personne-list.component';
import { CustomModule } from '../custom-module/custom-module.module';


@NgModule({
  declarations: [
    PersonneDialogComponent,
    PersonneListComponent
  ],
  imports: [
    CommonModule,
    PersonneRoutingModule,
    CustomModule
  ],
  exports: [
    PersonneDialogComponent,
    PersonneListComponent
  ]
})
export class PersonneModule { }
