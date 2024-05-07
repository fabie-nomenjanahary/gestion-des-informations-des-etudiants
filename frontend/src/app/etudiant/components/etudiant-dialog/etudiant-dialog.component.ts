import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

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
  parcours: Parcour[];
  niveaux: Niveau[];
  niveauAnnees:any;
  anneeScolaires: AnneeScolaire[];
  btn: string = 'Enregistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter un étudiant';
  isDetails: boolean = false;
  constructor(
    private _adapter: DateAdapter<any>, @Inject(MAT_DATE_LOCALE) private _locale: string,
    private fb: FormBuilder, private etudiantService: EtudiantService, private router: Router,
    private parcourService: ParcourService, private niveauService: NiveauService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private anneeScolaireService: AnneeScolaireService,
    private dialogRef: MatDialogRef<EtudiantDialogComponent>
  ) {
      this._locale = 'fr';
      this._adapter.setLocale(this._locale);
     }

  ngOnInit(): void {
    this.getParcours();
    this.getNiveaux();
    this.getAnneeScolaires();
    this.createForm();
    if (this.data) {
      if (this.data.btn) {
        this.btn = this.data.btn;
      }
      if (this.data.cancelBtn) {
        this.cancelBtn = this.data.cancelBtn;
        this.isDetails = true;
      }

      this.title = this.data.title;
      this.etudiantForm.controls['matricule'].setValue(this.data.row.matricule);
      this.etudiantForm.controls['nom'].setValue(this.data.row.personne.nom);
      this.etudiantForm.controls['prenom'].setValue(this.data.row.personne.prenom);
      this.etudiantForm.controls['dateNais'].setValue(this.data.row.personne.dateNais);
      this.etudiantForm.controls['lieuNais'].setValue(this.data.row.personne.lieuNais);
      this.etudiantForm.controls['idParcour'].setValue(this.data.row.parcour.id);

      let formarray = this.etudiantForm.controls['niveaux_annees'] as FormArray;
      this.niveauAnnees=this.data.row.niveaux;
      this.niveauAnnees.forEach((k,v) => {
        let formgroup = formarray.controls[v] as FormGroup;
        if (!formgroup) {
          formgroup = new FormGroup({
            niveau_id: new FormControl('', Validators.required),
            AS_id: new FormControl('', Validators.required)
          })
          formarray.push(formgroup);
        }
        formgroup.controls['niveau_id'].setValue(k.pivot.niveau_id);
        formgroup.controls['AS_id'].setValue(k.pivot.AS_id);
        if (this.isDetails) {
          formgroup.controls['niveau_id'].setValidators(null);
          formgroup.controls['AS_id'].setValidators(null);
        }

      });
      this.etudiantForm.controls['adresse'].setValue(this.data.row.personne.adresse);
      this.etudiantForm.controls['tel'].setValue(this.data.row.personne.tel);
      this.etudiantForm.controls['mail'].setValue(this.data.row.personne.mail);
      this.etudiantForm.controls['observation'].setValue(this.data.row.personne.observation);

      if (this.isDetails) {
        this.etudiantForm.disable();
        Object.values(this.etudiantForm.controls).forEach(control => {
          control.setValidators(null);
        });
      }
    }
  }
  createForm() {
    this.etudiantForm = this.fb.group(
      {
        matricule: ['',
          [
            Validators.required,
            Validators.pattern('^[0-9]+H-F$')
          ]
        ],
        nom:['',Validators.required],
        prenom:[''],
        dateNais:['',Validators.required],
        lieuNais:['',Validators.required],
        idParcour:['',Validators.required],
        niveaux_annees: this.fb.array(
          [
            this.fb.group(
              {
                niveau_id: ['', Validators.required],
                AS_id:['',Validators.required]
              }
            )
          ]
        ),
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
        observation:['']
      }
    )
  }
  get myEtudiantForm() {
    return this.etudiantForm.controls;
  }
  get niveauAnnee() {
    let formarray = this.etudiantForm.get('niveaux_annees') as FormArray;
    let formgroup= formarray.controls[0] as FormGroup;
    let formcontrol = formgroup.controls;
    return formcontrol;
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
  addNiveau() {
    let niveauControl = <FormArray>this.etudiantForm.controls['niveaux_annees'];
    niveauControl.value.forEach(element => {
      this.anneeScolaires.forEach((AS,k) => {
        if (AS.id===element.AS_id) {
          // this.removeASElement(AS.id);
       }
      });
    });
    niveauControl.push(
      new FormGroup({
        niveau_id: new FormControl('', Validators.required),
        AS_id: new FormControl('', Validators.required)
      })
    );
    console.log(niveauControl);

  }
  removeASElement(id:number) {
    this.anneeScolaires= this.anneeScolaires.filter(function (e) {
            return e.id!=id
    });
    return this.anneeScolaires;
  }
  removeNiveau(index: number) {
    let niveauControl = <FormArray>this.etudiantForm.controls['niveaux_annees'];
    niveauControl.removeAt(index);
  }
  addEtudiant() {
      if (this.etudiantForm.valid) {

        let personne: Personne = new Personne();
        let etudiant: Etudiant = new Etudiant();

        personne.nom = this.etudiantForm.value.nom;
        personne.prenom = this.etudiantForm.value.prenom;
        personne.adresse = this.etudiantForm.value.adresse;
        console.log(this.etudiantForm.value.dateNais);
        personne.dateNais = this.etudiantForm.value.dateNais;

        if (typeof this.etudiantForm.value.dateNais !== "string") {
          personne.dateNais = this.etudiantForm.value.dateNais.format('YYYY-MM-DD');
        }

        personne.lieuNais = this.etudiantForm.value.lieuNais;
        personne.tel = this.etudiantForm.value.tel;
        personne.mail = this.etudiantForm.value.mail;

        etudiant.matricule = this.etudiantForm.value.matricule;
        etudiant.observation = this.etudiantForm.value.observation;
        etudiant.parcour_id = Number(this.etudiantForm.value.idParcour);
        this.etudiantForm.value.niveaux_annees.forEach(element => {
          etudiant.niveaux_annees.push(
            {
              niveau_id: Number(element.niveau_id),
              AS_id: Number(element.AS_id)
            }
          );
        });
        if (!this.data) {
          // TODO : show error/success message(s)
          this.etudiantService.create(personne, etudiant).subscribe({
            next: (res) => {
              this.etudiantForm.reset();
              this.dialogRef.close('save');
            },
            error: (res) => {
              console.log(res);

              alert("Une erreur s'est produite lors de l'ajout de cet étudiant");
            }
          })
        } else {
          // TODO : show error/success message(s)
          console.log(this.data.row);
          personne.id = this.data.row.personne_id;
          etudiant.personne_id = personne.id;
          console.log(personne);
          console.log(etudiant);

          this.etudiantService.update(Number(this.data.row.id),personne, etudiant).subscribe({
            next: (res) => {
              this.etudiantForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              alert("Une erreur s'est produite lors de la modification de cet étudiant");
            }
          })
        }
      } else {
        console.log('Invalid information');
      }
  }

}
