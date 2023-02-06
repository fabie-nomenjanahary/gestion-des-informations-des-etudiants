import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NiveauDialogComponent } from './components/niveau-dialog/niveau-dialog.component';
import { NiveauListComponent } from './components/niveau-list/niveau-list.component';

const routes: Routes = [
  { path: 'niveaux', redirectTo: 'niveaux/list', pathMatch: 'full' },
  { path: 'niveaux/list', component: NiveauListComponent },
  { path: 'niveaux/create', component: NiveauDialogComponent },
  { path: 'niveaux/edit/:id', component: NiveauDialogComponent },
  { path: 'niveaux/details/:id', component: NiveauDialogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NiveauRoutingModule { }
