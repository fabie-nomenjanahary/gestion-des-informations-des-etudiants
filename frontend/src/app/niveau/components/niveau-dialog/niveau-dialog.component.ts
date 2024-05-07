import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Niveau } from '../../niveau.model';
import { NiveauService } from '../../niveau.service';

@Component({
  selector: 'app-niveau-dialog',
  templateUrl: './niveau-dialog.component.html',
  styleUrls: ['./niveau-dialog.component.css']
})
export class NiveauDialogComponent implements OnInit{

  niveauForm: FormGroup;
  btn: string = 'Enrengistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter un niveau';
  isDetails: boolean = false;
  constructor(private fb: FormBuilder, private niveauService: NiveauService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<NiveauDialogComponent>) { }

  ngOnInit(): void {
    this.niveauForm = this.fb.group({
      libelle: ['', Validators.required],
      semestres: this.fb.group(
        {
          sem_1id: [''],
          sem_1: ['', Validators.required],
          sem_2id: [''],
          sem_2:['',Validators.required]
        }
      )
    })

    if (this.data) {
      if (this.data.btn) {
        this.btn = this.data.btn;
      }
      if (this.data.cancelBtn) {
        this.cancelBtn = this.data.cancelBtn;
        this.isDetails = true;
      }
      if (this.isDetails) {
        this.niveauForm.disable();
        Object.values(this.niveauForm.controls).forEach(control => {
          control.setValidators(null);
        });
      }
      this.title = this.data.title;
      this.niveauForm.controls['libelle'].setValue(this.data.row.libelle);
      let formgroup = this.niveauForm.controls['semestres'] as FormGroup;
      console.log(formgroup);

      if (this.data.row.semestres.length > 0) {
        formgroup.controls['sem_1id'].setValue(this.data.row.semestres[0].id);
        formgroup.controls['sem_1'].setValue(this.data.row.semestres[0].nom);
        formgroup.controls['sem_2id'].setValue(this.data.row.semestres[1].id);
        formgroup.controls['sem_2'].setValue(this.data.row.semestres[1].nom);
      }

      if (this.isDetails) {
        formgroup.controls['sem_1'].setValidators(null);
        formgroup.controls['sem_2'].setValidators(null);
      }
    }
  }

  addNiveau() {
    if (this.niveauForm.valid) {
      let niveau: Niveau = new Niveau();
      niveau.libelle = this.niveauForm.value.libelle;

      niveau.semestres = {
        sem_1:{id:this.niveauForm.value.semestres.sem_1id,nom:this.niveauForm.value.semestres.sem_1},
        sem_2:{id:this.niveauForm.value.semestres.sem_2id,nom:this.niveauForm.value.semestres.sem_2}
      };
      console.log(niveau);

      if (!this.data) {
        this.niveauService.create(niveau).subscribe({
          next: (res) => {
            console.log(res);
            this.niveauForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Une erreur s'est produite lors de l'ajout de ce niveau");
          }
      })
      } else {
        this.niveauService.update(Number(this.data.row.id), niveau).subscribe({
          next: (res) => {
            console.log(res);
            this.niveauForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert("Une erreur s'est produite lors de la modification de ce niveau");
          }
        })
      }
    } else {
      console.log('Invalid information');
    }
  }
}
