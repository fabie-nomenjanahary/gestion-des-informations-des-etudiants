import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatiereListComponent } from './components/matiere-list/matiere-list.component';
import { MatiereDialogComponent } from './components/matiere-dialog/matiere-dialog.component';

const routes: Routes = [
  { path: 'matieres', redirectTo: 'matieres/list', pathMatch: 'full' },
  { path: 'matieres/list', component: MatiereListComponent },
  { path: 'matieres/create', component: MatiereDialogComponent },
  { path: 'matieres/edit/:id', component: MatiereDialogComponent },
  { path: 'matieres/details/:id', component: MatiereDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatiereRoutingModule { }
