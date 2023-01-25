import { Component, OnInit } from '@angular/core';
import { AnneeScolaire } from '../../annee-scolaire.model';
import { AnneeScolaireService } from '../../annee-scolaire.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AnneeScolaireDialogComponent } from '../annee-scolaire-dialog/annee-scolaire-dialog.component';

@Component({
  selector: 'app-annee-scolaire-list',
  templateUrl: './annee-scolaire-list.component.html',
  styleUrls: ['./annee-scolaire-list.component.css']
})
export class AnneeScolaireListComponent implements OnInit{

  anneeScolaires: AnneeScolaire[];

  constructor(private anneeScolaireService: AnneeScolaireService,
    private ASDialog:MatDialog,
  ) { }
  
  ngOnInit(): void {
    this.getAnneeScolaires();
  }

  getAnneeScolaires() {
     this.anneeScolaireService.getAll().subscribe((data: AnneeScolaire[]) => {
      this.anneeScolaires = data;
      console.log(this.anneeScolaires);
    })
  }
  
  openDialog() {
    this.ASDialog.open(AnneeScolaireDialogComponent, {
      width:'30%'
    })
  }

  deleteAnneeScolaire(id: number) {
    //TODO
  }
}
