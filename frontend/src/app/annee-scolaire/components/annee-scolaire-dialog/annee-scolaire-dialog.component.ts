import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
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
  btn: string = 'Enrengistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Aajouter une année scolaire';
  isDetails: boolean = false;
  constructor(private fb: FormBuilder, private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    public ASService: AnneeScolaireService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<AnneeScolaireDialogComponent>
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
    console.log(this.data);
    if (this.data) {
      if (this.data.btn) {
        this.btn = this.data.btn;
      }
      if (this.data.cancelBtn) {
        this.cancelBtn = this.data.cancelBtn;
        this.isDetails = true;
      }

      this.title = this.data.title;
      this.ASForm.controls['annee'].setValue(this.data.row.annee);
      this.ASForm.controls['debutAS'].setValue(moment(this.data.row.debutAS));
      this.ASForm.controls['finAS'].setValue(moment(this.data.row.finAS));
    }
  }
  // get f() {
  //   return this.ASForm.controls;
  // }
  //, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+'),, Validators.email,Validators.pattern("^[0-9]*$") 
  addAnneeScolaire() {
    console.log(this.ASForm.value)
    if (this.ASForm.valid) {
      let AS: AnneeScolaire = new AnneeScolaire();
      if (this.ASForm.value.annee) {
        AS.annee = this.ASForm.value.annee;
      } else {
        AS.annee = this.ASForm.value.debutAS.format('YYYY') + "-" + this.ASForm.value.finAS.format('YYYY');
      }

      //TODO : WARNING-- moment date

      AS.debutAS = this.ASForm.value.debutAS.format('YYYY/MM/DD');
      AS.finAS = this.ASForm.value.finAS.format('YYYY/MM/DD');
      
      if (!this.data) {
        this.ASService.create(AS).subscribe({
          next: (res) => {
            console.log(res);
            this.ASForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Une erreur s'est produite lors de l'ajout de cette année scolaire");
          }
        })
      } else {
        this.ASService.update(Number(this.data.row.id), AS).subscribe({
          next: (res) => {
            console.log(res);
            this.ASForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert("Une erreur s'est produite lors de la modification de cette année scolaire");            
          }
        })
      }
    } else {
      console.log('invalid information')
    }
  }
  
}
