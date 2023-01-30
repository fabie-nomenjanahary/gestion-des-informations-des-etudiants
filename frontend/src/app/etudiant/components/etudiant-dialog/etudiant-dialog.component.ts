import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Etudiant } from '../../etudiant.model';
import { EtudiantService } from '../../etudiant.service';

@Component({
  selector: 'app-etudiant-dialog',
  templateUrl: './etudiant-dialog.component.html',
  styleUrls: ['./etudiant-dialog.component.css']
})
export class EtudiantDialogComponent implements OnInit{
  etudiantForm: FormGroup;
  
  constructor(private fb:FormBuilder,private etudiantService:EtudiantService,private router:Router){}
  
  ngOnInit(): void {
    this.etudiantForm = this.fb.group({
      matricule: ['', Validators.required],
      observation:['']
    })
  }

  addEtudiant() {
    console.log(this.etudiantForm.value);
    if (this.etudiantForm.valid) {
      let etudiant: Etudiant = new Etudiant();
      etudiant.matricule = this.etudiantForm.value.matricule;
      etudiant.observation = this.etudiantForm.value.observation;
      this.etudiantService.create(etudiant).subscribe(res => {
        console.log('success');
        this.router.navigateByUrl('etudiants/list');
      })
    } else {
      console.log('Invalid information');
    }
  }
}
