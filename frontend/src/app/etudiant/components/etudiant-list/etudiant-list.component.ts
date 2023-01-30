import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Etudiant } from '../../etudiant.model';
import { EtudiantService } from '../../etudiant.service';
import { EtudiantDialogComponent } from '../etudiant-dialog/etudiant-dialog.component';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit{
  etudiants: Etudiant[];

  constructor(private etudiantService: EtudiantService, private etudiantDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getEtudiants();
  }
  getEtudiants() {
    this.etudiantService.getAll().subscribe((data: Etudiant[]) => {
      this.etudiants = data;
      console.log(this.etudiants);
    })
  }
  
  openDialog() {
    this.etudiantDialog.open(EtudiantDialogComponent, {
      width:'40%'
    })
  }

  deleteEtudiant(id: number) {
    //TODO
  }
}
