import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import 'moment/locale/fr';
import { AnneeScolaire } from '../../annee-scolaire.model';
import { AnneeScolaireService } from '../../annee-scolaire.service';

@Component({
  selector: 'app-annee-scolaire-dialog',
  templateUrl: './annee-scolaire-dialog.component.html',
  styleUrls: ['./annee-scolaire-dialog.component.css'],
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
export class AnneeScolaireDialogComponent implements OnInit{
  
  ASForm: FormGroup;
  debutFC = new FormControl('', Validators.required);
  finFC = new FormControl('', Validators.required);
  constructor(private fb: FormBuilder, private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    public ASService:AnneeScolaireService,private router:Router
  ) {
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
  }

  ngOnInit(): void {
    this.ASForm = this.fb.group({
      annee:[''],
      debutAS:['',Validators.required],
      finAS:['',Validators.required]
    })
  }
  // get f() {
  //   return this.ASForm.controls;
  // }
  //, Validators.pattern('^[a-zA-Z???????????????????????????????????????????????? \-\']+'),, Validators.email,Validators.pattern("^[0-9]*$") 
  addAnneeScolaire() {
    console.log(this.ASForm.value)
    if (this.ASForm.valid) {
      let AS: AnneeScolaire = new AnneeScolaire();
      if (this.ASForm.value.annee) {
        AS.annee = this.ASForm.value.annee;
      } else {
        AS.annee = this.ASForm.value.debutAS.format('YYYY') + "-" + this.ASForm.value.finAS.format('YYYY');
      }
      //BUG 
      //TODO convert moment date
      //2023-01-30 14:00:00
      AS.debutAS = this.ASForm.value.debutAS.format('YYYY-MM-DD');
      AS.finAS = this.ASForm.value.finAS.format('YYYY-MM-DD');
      console.log(AS)
      console.log(typeof(AS.finAS))
      this.ASService.create(AS).subscribe(res => {
        console.log('success');
        this.router.navigateByUrl('annee-scolaires/list');
      })
      
    } else {
      console.log('invalid information')
    }
  }
  
}
