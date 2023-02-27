import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
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

  constructor(private fb: FormBuilder, private parcourService: ParcourService, private router: Router
  , private dialogRef: MatDialogRef<ParcourDialogComponent>) { }
  
  ngOnInit(): void {
    this.parcourForm = this.fb.group({
      libelle:['',Validators.required]
    })
  }
  
  addParcour() {
    console.log(this.parcourForm.value);
    if (this.parcourForm.valid) {
      let parcour: Parcour = new Parcour();
      parcour.libelle = this.parcourForm.value.libelle;
      this.parcourService.create(parcour).subscribe({
        next: (res) => {
          console.log(res);
          this.parcourForm.reset();
          this.dialogRef.close('save');
        },
        error: () => {
          alert("Un erreur s'est produit lors de l'ajout de ce parcour");
        }
      })
    } else {
      console.log('Invalid information');
    }
  }
}
