import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneeScolaireDialogComponent } from './components/annee-scolaire-dialog/annee-scolaire-dialog.component';
import { AnneeScolaireListComponent } from './components/annee-scolaire-list/annee-scolaire-list.component';

const routes: Routes = [
  { path: 'personnes', redirectTo: 'personnes/list', pathMatch: 'full' },
  { path: 'personnes/list', component: AnneeScolaireListComponent },
  {path:'personnes/create',component:AnneeScolaireDialogComponent},
  { path: 'personnes/edit/:id', component: AnneeScolaireDialogComponent },
  {path:'personnes/details/:id',component:AnneeScolaireDialogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnneeScolaireRoutingModule { }
