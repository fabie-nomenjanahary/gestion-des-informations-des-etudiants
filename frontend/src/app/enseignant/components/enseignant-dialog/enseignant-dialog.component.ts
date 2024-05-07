import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { EnseignantService } from '../../enseignant.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Personne } from 'src/app/personne/personne.model';
import { Enseignant } from '../../enseignant.model';

@Component({
  selector: 'app-enseignant-dialog',
  templateUrl: './enseignant-dialog.component.html',
  styleUrls: ['./enseignant-dialog.component.css'],
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
export class EnseignantDialogComponent {
  enseignantForm: FormGroup;
  btn: string = 'Enregistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter un enseignant';
  isDetails: boolean = false;
  constructor(
    private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder, private enseignantService: EnseignantService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<EnseignantDialogComponent>
  ) {
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
     }

  ngOnInit(): void {
    this.createForm();
    if (this.data) {
      if (this.data.btn) {
        this.btn = this.data.btn;
      }
      if (this.data.cancelBtn) {
        this.cancelBtn = this.data.cancelBtn;
        this.isDetails = true;
      }
      if (this.isDetails) {
        this.enseignantForm.disable();
        Object.values(this.enseignantForm.controls).forEach(control => {
          control.setValidators(null);
        });
      }
      this.title = this.data.title;
      this.enseignantForm.controls['matricule'].setValue(this.data.row.matricule);
      this.enseignantForm.controls['nom'].setValue(this.data.row.nom);
      this.enseignantForm.controls['prenom'].setValue(this.data.row.prenom);
      this.enseignantForm.controls['dateNais'].setValue(this.data.row.dateNais);
      this.enseignantForm.controls['lieuNais'].setValue(this.data.row.lieuNais);
      this.enseignantForm.controls['adresse'].setValue(this.data.row.adresse);
      this.enseignantForm.controls['tel'].setValue(this.data.row.tel);
      this.enseignantForm.controls['mail'].setValue(this.data.row.mail);
      this.enseignantForm.controls['grade'].setValue(this.data.row.grade);
      this.enseignantForm.controls['titre'].setValue(this.data.row.titre);
    }
  }
  createForm() {
    this.enseignantForm = this.fb.group(
      {
        matricule: ['',
          [
            Validators.required,
            Validators.pattern('^[0-9]+Ens$')
          ]
        ],
        nom:['',Validators.required],
        prenom:[''],
        dateNais:['',Validators.required],
        lieuNais:['',Validators.required],
        adresse:['',Validators.required],
        tel: ['',
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern('^[0-9]+$')
        ]
      ],
      mail: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    grade:[''],
    titre:['']
      }
    )
  }
  get myEnseignantForm() {
    return this.enseignantForm.controls;
  }
  addEnseignant() {
      if (this.enseignantForm.valid) {

        let personne: Personne = new Personne();
        let enseignant: Enseignant = new Enseignant();

        personne.nom = this.enseignantForm.value.nom;
        personne.prenom = this.enseignantForm.value.prenom;
        personne.adresse = this.enseignantForm.value.adresse;
        console.log(this.enseignantForm.value.dateNais);
        personne.dateNais = this.enseignantForm.value.dateNais;

        if (typeof this.enseignantForm.value.dateNais !== "string") {
          personne.dateNais = this.enseignantForm.value.dateNais.format('YYYY-MM-DD');
        }

        personne.lieuNais = this.enseignantForm.value.lieuNais;
        personne.tel = this.enseignantForm.value.tel;
        personne.mail = this.enseignantForm.value.mail;

        enseignant.matricule = this.enseignantForm.value.matricule;
        enseignant.grade = this.enseignantForm.value.grade;
        enseignant.titre = this.enseignantForm.value.titre;

        if (!this.data) {
          // TODO : show error/success message(s)
          this.enseignantService.create(personne, enseignant).subscribe({
            next: (res) => {
              this.enseignantForm.reset();
              this.dialogRef.close('save');
            },
            error: (res) => {
              console.log(res);

              alert("Une erreur s'est produite lors de l'ajout de cet enseignant");
            }
          })
        } else {
          // TODO : show error/success message(s)
          console.log(this.data.row);
          personne.id = this.data.row.personne_id;
          enseignant.personne_id = personne.id;
          console.log(personne);
          console.log(enseignant);

          this.enseignantService.update(Number(this.data.row.id),personne, enseignant).subscribe({
            next: (res) => {
              this.enseignantForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              alert("Une erreur s'est produite lors de la modification de cet enseignant");
            }
          })
        }
      } else {
        console.log('Invalid information');
      }
  }
}
