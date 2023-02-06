import { Component, OnInit, Inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Router } from '@angular/router';
import 'moment/locale/fr';
import { Personne } from '../../personne.model';
import { PersonneService } from '../../personne.service';

@Component({
  selector: 'app-personne-dialog',
  templateUrl: './personne-dialog.component.html',
  styleUrls: ['./personne-dialog.component.css'],
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
export class PersonneDialogComponent implements OnInit{

  personneForm: FormGroup
  
  constructor(private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder, private personneService: PersonneService, private router: Router
  ) {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this.personneForm= this.fb.group({
      nom:['',Validators.required],
      prenom:[''],
      dateNais:['',Validators.required],
      lieuNais:['',Validators.required],
      adresse:['',Validators.required],
      tel: ['', Validators.required],
      mail:['',Validators.required]
    })
  }

  addPersonne() {
    console.log(this.personneForm.value);
    if (this.personneForm.valid) {
      let personne: Personne = new Personne();
      personne.nom = this.personneForm.value.nom;
      personne.prenom = this.personneForm.value.prenom;
      personne.dateNais = this.personneForm.value.dateNais;
      personne.lieuNais = this.personneForm.value.lieuNais;
      personne.adresse = this.personneForm.value.adresse;
      personne.tel = this.personneForm.value.tel;
      personne.mail = this.personneForm.value.mail;
      this.personneService.create(personne).subscribe(res => {
        console.log('success');
        this.router.navigateByUrl('personnes/list');
      })
    } else {
      console.log('Invalid information');
    }
  }
}
