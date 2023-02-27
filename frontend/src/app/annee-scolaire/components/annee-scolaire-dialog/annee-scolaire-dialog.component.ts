import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    public ASService: AnneeScolaireService, private router: Router,
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

      AS.debutAS = this.ASForm.value.debutAS.format('YYYY-MM-DD');
      AS.finAS = this.ASForm.value.finAS.format('YYYY-MM-DD');

      this.ASService.create(AS).subscribe({
        next: (res) => {
          console.log(res);
          this.ASForm.reset();
          this.dialogRef.close('save');
          // this.router.navigateByUrl('annee-scolaires/list');
        },
        error: () => {
          alert("Un erreur s'est produit lors de l'ajout de cette année scolaire");
        }
      })
      
    } else {
      console.log('invalid information')
    }
  }
  
}
