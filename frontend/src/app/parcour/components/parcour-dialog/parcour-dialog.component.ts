import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private parcourService: ParcourService, private router: Router) { }
  
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
      this.parcourService.create(parcour).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('parcours/list');
      })
    } else {
      console.log('Invalid information');
    }
  }
}
