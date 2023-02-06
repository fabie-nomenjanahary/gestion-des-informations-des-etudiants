import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParcourDialogComponent } from './components/parcour-dialog/parcour-dialog.component';
import { ParcourListComponent } from './components/parcour-list/parcour-list.component';

const routes: Routes = [
  { path: 'parcours', redirectTo: 'parcours/list', pathMatch: 'full' },
  { path: 'parcours/list', component: ParcourListComponent },
  { path: 'parcours/create',component:ParcourDialogComponent },
  { path: 'parcours/edit/:id',component:ParcourDialogComponent },
  { path: 'parcours/details/:id',component:ParcourDialogComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParcourRoutingModule { }
