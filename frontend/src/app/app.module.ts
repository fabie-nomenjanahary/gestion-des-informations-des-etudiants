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

@NgModule({
  declarations: [
    AppComponent,NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CustomModule,
    AnneeScolaireModule,
    EtudiantModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
