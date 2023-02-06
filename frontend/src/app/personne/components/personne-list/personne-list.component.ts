import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Personne } from '../../personne.model';
import { PersonneService } from '../../personne.service';
import { PersonneDialogComponent } from '../personne-dialog/personne-dialog.component';

@Component({
  selector: 'app-personne-list',
  templateUrl: './personne-list.component.html',
  styleUrls: ['./personne-list.component.css']
})
export class PersonneListComponent {
  personnes: Personne[];

  constructor(private personneService: PersonneService, private personneDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getPersonnes();
  }
  getPersonnes() {
    this.personneService.getAll().subscribe((data: Personne[]) => {
      this.personnes = data;
      console.log(this.personnes);
    })
  }
  
  openDialog() {
    this.personneDialog.open(PersonneDialogComponent, {
      width:'40%'
    })
  }

  deletePersonne(id: number) {
    //TODO
  }
}
