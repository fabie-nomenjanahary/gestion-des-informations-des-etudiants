import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AnneeScolaireModule } from './annee-scolaire/annee-scolaire.module';
import { NavigationComponent } from './navigation/navigation.component';
import { CustomModule } from './custom-module/custom-module.module';
import { EtudiantModule } from './etudiant/etudiant.module';
import { NiveauModule } from './niveau/niveau.module';
import { ParcourModule } from './parcour/parcour.module';
import { PersonneModule } from './personne/personne.module';
import { EnseignantModule } from './enseignant/enseignant.module';
import { MatConfirmDialogComponent } from './mat-confirm-dialog/components/mat-confirm-dialog/mat-confirm-dialog.component';
import { UniteEnseignementModule } from './unite-enseignement/unite-enseignement.module';
import { MatiereModule } from './matiere/matiere.module';
@NgModule({
  declarations: [
    AppComponent,NavigationComponent, MatConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomModule,
    AnneeScolaireModule,
    EtudiantModule,
    NiveauModule,
    ParcourModule,
    PersonneModule,
    EnseignantModule,
    UniteEnseignementModule,
    MatiereModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
