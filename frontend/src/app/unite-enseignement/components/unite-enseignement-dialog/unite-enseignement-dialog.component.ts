import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Semestre } from 'src/app/niveau/semestre.model';
import { Parcour } from 'src/app/parcour/parcour.model';
import { UniteEnseignementService } from '../../unite-enseignement.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ParcourService } from 'src/app/parcour/parcour.service';
import { NiveauService } from 'src/app/niveau/niveau.service';
import { UniteEnseignement } from '../../unite-enseignement.model';

@Component({
  selector: 'app-unite-enseignement-dialog',
  templateUrl: './unite-enseignement-dialog.component.html',
  styleUrls: ['./unite-enseignement-dialog.component.css']
})
export class UniteEnseignementDialogComponent {
  uniteEnseignementForm: FormGroup;
  parcours: Parcour[];
  semestres: Semestre[];
  btn: string = 'Enregistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter une unité d\'enseignement';
  isDetails: boolean = false;
  constructor(
    private fb: FormBuilder, private uniteEnseignementService: UniteEnseignementService, private router: Router,
    private parcourService: ParcourService, private semestreService: NiveauService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<UniteEnseignementDialogComponent>
  ) {
     }

  ngOnInit(): void {
    this.getParcours();
    this.getSemestres();
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
        this.uniteEnseignementForm.disable();
        Object.values(this.uniteEnseignementForm.controls).forEach(control => {
          control.setValidators(null);
        });
      }
      this.title = this.data.title;
      this.uniteEnseignementForm.controls['nom'].setValue(this.data.row.nom);
      this.uniteEnseignementForm.controls['creditUE'].setValue(this.data.row.creditUE);
      this.uniteEnseignementForm.controls['parcour_id'].setValue(this.data.row.parcour_id);
      this.uniteEnseignementForm.controls['sem_id'].setValue(this.data.row.sem_id);
     }
  }
  createForm() {
this.uniteEnseignementForm = this.fb.group(
      {
        nom:['',Validators.required],
        creditUE:['',Validators.required],
        parcour_id:['',Validators.required],
        sem_id:['',Validators.required]
      }
    )
  }
  get myUniteEnseignementForm() {
    return this.uniteEnseignementForm.controls;
  }

 getParcours() {
    this.parcourService.getAll().subscribe((data: Parcour[]) => {
      this.parcours = data;

    })
  }
  getSemestres() {
      this.semestreService.getAllSemestres().subscribe((data: Semestre[]) => {
        this.semestres = data;
      })

  }

  addUniteEnseignement() {
      if (this.uniteEnseignementForm.valid) {

        let uniteEnseignement: UniteEnseignement = new UniteEnseignement();

        uniteEnseignement.nom = this.uniteEnseignementForm.value.nom;
        uniteEnseignement.creditUE = this.uniteEnseignementForm.value.creditUE;
        uniteEnseignement.parcour_id = Number(this.uniteEnseignementForm.value.parcour_id);
        uniteEnseignement.sem_id = Number(this.uniteEnseignementForm.value.sem_id);

        if (!this.data) {
          // TODO : show error/success message(s)
          this.uniteEnseignementService.create(uniteEnseignement).subscribe({
            next: (res) => {
              this.uniteEnseignementForm.reset();
              this.dialogRef.close('save');
            },
            error: (res) => {
              console.log(res);

              alert("Une erreur s'est produite lors de l'ajout de cette unité d'enseignement");
            }
          })
        } else {
          // TODO : show error/success message(s)
          console.log(this.data.row);
          this.uniteEnseignementService.update(Number(this.data.row.id),uniteEnseignement).subscribe({
            next: (res) => {
              this.uniteEnseignementForm.reset();
              this.dialogRef.close('update');
            },
            error: () => {
              alert("Une erreur s'est produite lors de la modification de cette unité d'enseignement");
            }
          })
        }
      } else {
        console.log('Invalid information');
      }
  }
}
