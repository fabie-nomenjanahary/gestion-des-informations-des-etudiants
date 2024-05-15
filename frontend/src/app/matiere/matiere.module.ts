import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomModule } from '../custom-module/custom-module.module';
import { MatiereRoutingModule } from './matiere-routing.module';
import { MatiereListComponent } from './components/matiere-list/matiere-list.component';
import { MatiereDialogComponent } from './components/matiere-dialog/matiere-dialog.component';
import { UEMatiereListComponent } from './components/uematiere-list/uematiere-list.component';


@NgModule({
  declarations: [
    MatiereListComponent,
    MatiereDialogComponent,
    UEMatiereListComponent
  ],
  imports: [
    CommonModule,
    MatiereRoutingModule,
    CustomModule
  ],
  exports: [
    MatiereListComponent,
    MatiereDialogComponent,
    UEMatiereListComponent
  ]
})
export class MatiereModule { }
