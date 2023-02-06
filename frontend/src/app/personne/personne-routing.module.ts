import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonneDialogComponent } from './components/personne-dialog/personne-dialog.component';
import { PersonneListComponent } from './components/personne-list/personne-list.component';

const routes: Routes = [
  { path: 'personnes', redirectTo: 'personnes/list', pathMatch: 'full' },
  { path: 'personnes/list', component: PersonneListComponent },
  { path: 'personnes/create',component:PersonneDialogComponent },
  { path: 'personnes/edit/:id',component:PersonneDialogComponent },
  { path: 'personnes/details/:id',component:PersonneDialogComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonneRoutingModule { }
