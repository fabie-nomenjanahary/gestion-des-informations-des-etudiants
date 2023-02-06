import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Niveau } from '../../niveau.model';
import { NiveauService } from '../../niveau.service';
import { NiveauDialogComponent } from '../niveau-dialog/niveau-dialog.component';

@Component({
  selector: 'app-niveau-list',
  templateUrl: './niveau-list.component.html',
  styleUrls: ['./niveau-list.component.css']
})
export class NiveauListComponent {
  niveaux: Niveau[];

  constructor(private niveauService: NiveauService, private etudiantDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getNiveaus();
  }
  getNiveaus() {
    this.niveauService.getAll().subscribe((data: Niveau[]) => {
      this.niveaux = data;
      console.log(this.niveaux);
    })
  }
  
  openDialog() {
    this.etudiantDialog.open(NiveauDialogComponent, {
      width:'30%'
    })
  }

  deleteNiveau(id: number) {
    //TODO
  }
}
