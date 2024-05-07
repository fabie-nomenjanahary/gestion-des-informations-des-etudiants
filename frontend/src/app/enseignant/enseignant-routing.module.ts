import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnseignantDialogComponent } from './components/enseignant-dialog/enseignant-dialog.component';
import { EnseignantListComponent } from './components/enseignant-list/enseignant-list.component';

const routes: Routes = [
  { path: 'enseignants', redirectTo: 'enseignants/list', pathMatch: 'full' },
  { path: 'enseignants/list', component: EnseignantListComponent },
  { path: 'enseignants/create',component: EnseignantDialogComponent },
  { path: 'enseignants/edit/:id',component: EnseignantDialogComponent },
  { path: 'enseignants/details/:id',component: EnseignantDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnseignantRoutingModule { }
