import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnneeScolaireDialogComponent } from './components/annee-scolaire-dialog/annee-scolaire-dialog.component';
import { AnneeScolaireListComponent } from './components/annee-scolaire-list/annee-scolaire-list.component';

const routes: Routes = [
  { path: 'annee-scolaires', redirectTo: 'annee-scolaires/list', pathMatch: 'full' },
  { path: 'annee-scolaires/list', component: AnneeScolaireListComponent },
  {path:'annee-scolaires/create',component:AnneeScolaireDialogComponent},
  { path: 'annee-scolaires/edit/:id', component: AnneeScolaireDialogComponent },
  {path:'annee-scolaires/details/:id',component:AnneeScolaireDialogComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnneeScolaireRoutingModule { }
