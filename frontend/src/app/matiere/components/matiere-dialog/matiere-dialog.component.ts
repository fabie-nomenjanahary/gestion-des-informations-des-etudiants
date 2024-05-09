import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UniteEnseignement } from 'src/app/unite-enseignement/unite-enseignement.model';
import { MatiereService } from '../../matiere.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UniteEnseignementService } from 'src/app/unite-enseignement/unite-enseignement.service';
import { Matiere } from '../../matiere.model';

@Component({
  selector: 'app-matiere-dialog',
  templateUrl: './matiere-dialog.component.html',
  styleUrls: ['./matiere-dialog.component.css']
})
export class MatiereDialogComponent {
  matiereForm: FormGroup;
  uniteEnseignements: UniteEnseignement[];
  btn: string = 'Enregistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter une matière';
  isDetails: boolean = false;
  nomUE:string="";
  constructor(
    private fb: FormBuilder, private matiereService: MatiereService, private router: Router,
    private uniteEnseignementrService: UniteEnseignementService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<MatiereDialogComponent>
  ) {
     }

  ngOnInit(): void {
    this.getUniteEnseignements();
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
        this.matiereForm.disable();
        Object.values(this.matiereForm.controls).forEach(control => {
          control.setValidators(null);
        });
      }
      console.log(this.data);

      this.title = this.data.title;
      this.nomUE = "UE : "+this.data.row.nom+" ("+this.data.row.semestre.niveau.libelle+this.data.row.parcour.libelle+" - "+this.data.row.semestre.nom+")";
      // this.matiereForm.controls['nom'].setValue(this.data.row.nom);
      // this.matiereForm.controls['ET'].setValue(this.data.row.ET);
      // this.matiereForm.controls['ED'].setValue(this.data.row.ED);
      // this.matiereForm.controls['EP'].setValue(this.data.row.EP);
      // this.matiereForm.controls['creditEC'].setValue(this.data.row.creditEC);
      // this.matiereForm.controls['poidsEC'].setValue(this.data.row.poidsEC);
     }
  }
  createForm() {
    this.matiereForm = this.fb.group(
      {
        nom:['',Validators.required],
        ET:['',Validators.required],
        ED:['',Validators.required],
        EP:['',Validators.required],
        creditEC:['',Validators.required],
        poidsEC:['',Validators.required],
      }
    )
  }
  get myMatiereForm() {
    return this.matiereForm.controls;
  }

 getUniteEnseignements() {
    this.uniteEnseignementrService.getAll().subscribe((data: UniteEnseignement[]) => {
      this.uniteEnseignements = data;

    })
  }

  addMatiere() {
      if (this.matiereForm.valid) {

        let matiere: Matiere = new Matiere();

        matiere.nom = this.matiereForm.value.nom;
        matiere.ET = Number(this.matiereForm.value.ET);
        matiere.ED = Number(this.matiereForm.value.ED);
        matiere.EP = Number(this.matiereForm.value.EP);
        matiere.creditEC = Number(this.matiereForm.value.creditEC);
        matiere.poidsEC = Number(this.matiereForm.value.poidsEC);
        if (!this.data) {
          // TODO : show error/success message(s)
          matiere.UE_id = Number(this.matiereForm.value.UE_id);
          // this.matiereService.create(matiere).subscribe({
          //   next: (res) => {
          //     this.matiereForm.reset();
          //     this.dialogRef.close('save');
          //   },
          //   error: (res) => {
          //     console.log(res);

          //     alert("Une erreur s'est produite lors de l'ajout de cette unité d'enseignement");
          //   }
          // })
        } else {
          // TODO : show error/success message(s)
          matiere.UE_id = Number(this.data.row.id);
          this.matiereService.create(matiere).subscribe({
            next: (res) => {
              console.log(res['message']);

              this.matiereForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Une erreur s'est produite lors de l'ajout de matière à cette unité d'enseignement");
            }
          })
        }
      } else {
        console.log('Invalid information');
      }
  }
}
