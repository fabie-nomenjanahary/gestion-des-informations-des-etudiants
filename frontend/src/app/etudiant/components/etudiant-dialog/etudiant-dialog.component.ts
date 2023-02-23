import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from '../../etudiant.model';
import { EtudiantService } from '../../etudiant.service';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import 'moment/locale/fr';
import { Parcour } from 'src/app/parcour/parcour.model';
import { Niveau } from 'src/app/niveau/niveau.model';
import { ParcourService } from 'src/app/parcour/parcour.service';
import { NiveauService } from 'src/app/niveau/niveau.service';
import { Personne } from 'src/app/personne/personne.model';
import { AnneeScolaire } from 'src/app/annee-scolaire/annee-scolaire.model';
import { AnneeScolaireService } from 'src/app/annee-scolaire/annee-scolaire.service';
import { PersonneService } from 'src/app/personne/personne.service';
@Component({
  selector: 'app-etudiant-dialog',
  templateUrl: './etudiant-dialog.component.html',
  styleUrls: ['./etudiant-dialog.component.css'],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class EtudiantDialogComponent implements OnInit{

  etudiantForm: FormGroup;
  selectedParcour: string;
  selectedNiveau: string;
  selectedAS: string;
  parcours: Parcour[];
  niveaux: Niveau[];
  anneeScolaires: AnneeScolaire[];

  constructor(private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder, private etudiantService: EtudiantService, private router: Router,
    private parcourService: ParcourService, private niveauService: NiveauService,
    private anneeScolaireService:AnneeScolaireService,private personneService:PersonneService
  ) {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
    
     }
  
  ngOnInit(): void {
    this.getParcours();
    this.getNiveaux();
    this.getAnneeScolaires();
    this.etudiantForm = this.fb.group({
      matricule: ['', Validators.required],
      nom:['',Validators.required],
      prenom:[''],
      dateNais:['',Validators.required],
      lieuNais:['',Validators.required],
      idParcour:['',Validators.required],
      idNiveau:['',Validators.required],
      idAS:['',Validators.required],
      adresse:['',Validators.required],
      tel: ['', Validators.required],
      mail:['',Validators.required],
      observation:['']
    })
  }
 getParcours() {
    this.parcourService.getAll().subscribe((data: Parcour[]) => {
      this.parcours = data;
      
    })
  }
getNiveaux() {
    this.niveauService.getAll().subscribe((data: Niveau[]) => {
      this.niveaux = data;
    })
}
    getAnneeScolaires() {
     this.anneeScolaireService.getAll().subscribe((data: AnneeScolaire[]) => {
      this.anneeScolaires = data;
    })
  }
  addEtudiant() {

    
    if (this.etudiantForm.valid) {
      
      let personne: Personne = new Personne();
      let etudiant: Etudiant = new Etudiant();

      personne.nom = this.etudiantForm.value.nom;
      personne.prenom = this.etudiantForm.value.prenom;
      personne.adresse = this.etudiantForm.value.adresse;
      personne.dateNais = this.etudiantForm.value.dateNais.format('YYYY-MM-DD');
      personne.lieuNais = this.etudiantForm.value.lieuNais;
      personne.tel = this.etudiantForm.value.tel;
      personne.mail = this.etudiantForm.value.mail;

      etudiant.matricule = this.etudiantForm.value.matricule;
      etudiant.observation = this.etudiantForm.value.observation;
      etudiant.parcour_id = Number(this.selectedParcour);
      etudiant.niveau_id = Number(this.selectedNiveau);
      etudiant.AS_id = Number(this.selectedAS);
      this.etudiantService.search(personne, etudiant).subscribe(res => {
        console.log(res)
      })
      // this.personneService
      //   .search(this.etudiantForm.value.nom, this.etudiantForm.value.prenom, this.etudiantForm.value.mail)
      //   .subscribe(res => {
      //     if (res.id) {
      //       etudiant.personne_id = res.id;
      //     } else {
      //       personne.nom = this.etudiantForm.value.nom;
      //       personne.prenom = this.etudiantForm.value.prenom;
      //       personne.adresse = this.etudiantForm.value.adresse;
      //       personne.dateNais = this.etudiantForm.value.dateNais.format('YYYY-MM-DD');
      //       personne.lieuNais = this.etudiantForm.value.lieuNais;
      //       personne.tel = this.etudiantForm.value.tel;
      //       personne.mail = this.etudiantForm.value.mail;
      //       this.personneService.create(personne).subscribe(res => {
      //         //BUG
      //         this.personneService.search(personne.nom, personne.prenom, personne.mail).subscribe(res => {
      //           if (res.id) {
      //             etudiant.personne_id = res.id;
      //           } else {
      //           }
      //         })
      //       })
      //     }
      //     console.log(etudiant);
      //     this.etudiantService.create(etudiant).subscribe(res => {
      //       console.log('success');
      //       this.router.navigateByUrl('etudiants/list');
      //     })

      //   })
    } else {
      console.log('Invalid information');
    }
  }
}
