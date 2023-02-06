import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder, private niveauService: NiveauService, private router: Router) { }
  
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
      this.niveauService.create(niveau).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('niveaux/list');
      })
    } else {
      console.log('Invalid information');
    }
  }
}
