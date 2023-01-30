import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantDialogComponent } from './components/etudiant-dialog/etudiant-dialog.component';
import { EtudiantListComponent } from './components/etudiant-list/etudiant-list.component';

const routes: Routes = [
  { path: 'etudiants', redirectTo: 'etudiants/list', pathMatch: 'full' },
  { path: 'etudiants/list', component: EtudiantListComponent },
  { path: 'etudiants/create',component:EtudiantDialogComponent },
  { path: 'etudiants/edit/:id',component:EtudiantDialogComponent },
  { path: 'etudiants/details/:id',component:EtudiantDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
