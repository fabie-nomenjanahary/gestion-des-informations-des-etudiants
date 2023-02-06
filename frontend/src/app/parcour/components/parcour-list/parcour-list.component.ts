import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Parcour } from '../../parcour.model';
import { ParcourService } from '../../parcour.service';
import { ParcourDialogComponent } from '../parcour-dialog/parcour-dialog.component';

@Component({
  selector: 'app-parcour-list',
  templateUrl: './parcour-list.component.html',
  styleUrls: ['./parcour-list.component.css']
})
export class ParcourListComponent {
  parcours: Parcour[];

  constructor(private parcourService: ParcourService, private parcourDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getParcours();
  }
  getParcours() {
    this.parcourService.getAll().subscribe((data: Parcour[]) => {
      this.parcours = data;
      console.log(this.parcours);
    })
  }
  
  openDialog() {
    this.parcourDialog.open(ParcourDialogComponent, {
      width:'30%'
    })
  }

  deleteParcour(id: number) {
    //TODO
  }
}
