import { Component, OnInit } from '@angular/core';
import { AnneeScolaire } from '../../annee-scolaire.model';
import { AnneeScolaireService } from '../../annee-scolaire.service';

@Component({
  selector: 'app-annee-scolaire-list',
  templateUrl: './annee-scolaire-list.component.html',
  styleUrls: ['./annee-scolaire-list.component.css']
})
export class AnneeScolaireListComponent implements OnInit{

  anneeScolaires: AnneeScolaire[];

  constructor(public anneeScolaireService: AnneeScolaireService) { }
  
  ngOnInit(): void {
    this.anneeScolaireService.getAll().subscribe((data: AnneeScolaire[]) => {
      this.anneeScolaires = data;
      console.log(this.anneeScolaires);
    })
  }
  
  openDialog() {
  
  }

  deleteAnneeScolaire(id: number) {
    //TODO
  }
}
