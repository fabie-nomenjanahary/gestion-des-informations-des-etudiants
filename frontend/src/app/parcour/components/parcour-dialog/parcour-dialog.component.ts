import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Parcour } from '../../parcour.model';
import { ParcourService } from '../../parcour.service';

@Component({
  selector: 'app-parcour-dialog',
  templateUrl: './parcour-dialog.component.html',
  styleUrls: ['./parcour-dialog.component.css']
})
export class ParcourDialogComponent implements OnInit{

  parcourForm: FormGroup;
  btn: string = 'Enrengistrer';
  cancelBtn: string = 'Annuler';
  title: string = 'Ajouter un parcour';
  isDetails: boolean = false;
  constructor(private fb: FormBuilder, private parcourService: ParcourService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<ParcourDialogComponent>) { }
  
  ngOnInit(): void {
    this.parcourForm = this.fb.group({
      libelle:['',Validators.required]
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
      this.parcourForm.controls['libelle'].setValue(this.data.row.libelle);
    }
  }
  
  addParcour() {
    console.log(this.parcourForm.value);
    if (this.parcourForm.valid) {
      let parcour: Parcour = new Parcour();
      parcour.libelle = this.parcourForm.value.libelle;
      if (!this.data) {
        this.parcourService.create(parcour).subscribe({
          next: (res) => {
            console.log(res);
            this.parcourForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert("Une erreur s'est produite lors de l'ajout de ce parcour");
          }
      })
      } else {
         this.parcourService.update(Number(this.data.row.id), parcour).subscribe({
          next: (res) => {
            console.log(res);
            this.parcourForm.reset();
            this.dialogRef.close('update');
          },
          error: () => {
            alert("Une erreur s'est produite lors de la modification de ce parcour");            
          }
          })
      }
    } else {
      console.log('Invalid information');
    }
  }
}
