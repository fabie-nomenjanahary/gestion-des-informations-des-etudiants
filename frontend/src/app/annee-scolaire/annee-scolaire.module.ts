import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnneeScolaireRoutingModule } from './annee-scolaire-routing.module';
import { AnneeScolaireDialogComponent } from './components/annee-scolaire-dialog/annee-scolaire-dialog.component';
import { AnneeScolaireListComponent } from './components/annee-scolaire-list/annee-scolaire-list.component';
import { CustomModule } from '../custom-module/custom-module.module';

@NgModule({
  declarations: [
  
    AnneeScolaireDialogComponent,
       AnneeScolaireListComponent
  ],
  imports: [
    CommonModule,
    AnneeScolaireRoutingModule,
    CustomModule,

  ],
  exports: [
  
    AnneeScolaireDialogComponent,
       AnneeScolaireListComponent
  ],
})
export class AnneeScolaireModule { }
