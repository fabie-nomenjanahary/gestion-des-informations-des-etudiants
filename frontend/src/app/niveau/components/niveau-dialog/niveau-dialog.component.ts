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
      libelle: ['', Validators.required]
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
      this.niveauForm.controls['libelle'].setValue(this.data.row.libelle);
    }
  }
  
  addNiveau() {
    console.log(this.niveauForm.value);
    if (this.niveauForm.valid) {
      let niveau: Niveau = new Niveau();
      niveau.libelle = this.niveauForm.value.libelle;

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
