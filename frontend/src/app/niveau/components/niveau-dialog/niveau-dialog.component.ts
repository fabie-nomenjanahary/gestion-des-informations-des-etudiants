import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, private niveauService: NiveauService, private router: Router
  , private dialogRef: MatDialogRef<NiveauDialogComponent>) { }
  
  ngOnInit(): void {
    this.niveauForm = this.fb.group({
      libelle:['',Validators.required]
    })
  }
  
  addNiveau() {
    console.log(this.niveauForm.value);
    if (this.niveauForm.valid) {
      let niveau: Niveau = new Niveau();
      niveau.libelle = this.niveauForm.value.libelle;
      this.niveauService.create(niveau).subscribe({
        next: (res) => {
          console.log(res);
          this.niveauForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert("Un erreur s'est produit lors de l'ajout de ce niveau");
        }
      })
    } else {
      console.log('Invalid information');
    }
  }
}
