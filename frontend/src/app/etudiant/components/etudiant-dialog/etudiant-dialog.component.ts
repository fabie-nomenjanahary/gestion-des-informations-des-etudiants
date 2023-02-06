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
  // parcours: Parcour[];
  // niveaux: Niveau[];

  constructor(private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder, private etudiantService: EtudiantService, private router: Router) {
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
     }
  
  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
      matricule: ['', Validators.required],
      nom:['',Validators.required],
      prenom:[''],
      dateNais:['',Validators.required],
      lieuNais:['',Validators.required],
      idParcour:['',Validators.required],
      idNiveau:['',Validators.required],
      annee:[''],
      debutAS:['',Validators.required],
      finAS:['',Validators.required],
      adresse:['',Validators.required],
      tel: ['', Validators.required],
      mail:['',Validators.required],
      observation:['']
    })
  }

  addEtudiant() {
    console.log(this.etudiantForm.value);
    if (this.etudiantForm.valid) {
      let etudiant: Etudiant = new Etudiant();
      etudiant.matricule = this.etudiantForm.value.matricule;
      etudiant.observation = this.etudiantForm.value.observation;
      this.etudiantService.create(etudiant).subscribe(res => {
        console.log('success');
        this.router.navigateByUrl('etudiants/list');
      })
    } else {
      console.log('Invalid information');
    }
  }
}
