import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UniteEnseignementListComponent } from './components/unite-enseignement-list/unite-enseignement-list.component';
import { UniteEnseignementDialogComponent } from './components/unite-enseignement-dialog/unite-enseignement-dialog.component';

const routes: Routes = [
  { path: 'unite-enseignements', redirectTo: 'unite-enseignements/list', pathMatch: 'full' },
  { path: 'unite-enseignements/list', component: UniteEnseignementListComponent },
  { path: 'unite-enseignements/create', component: UniteEnseignementDialogComponent },
  { path: 'unite-enseignements/edit/:id', component: UniteEnseignementDialogComponent },
  { path: 'unite-enseignements/details/:id', component: UniteEnseignementDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UniteEnseignementRoutingModule { }
