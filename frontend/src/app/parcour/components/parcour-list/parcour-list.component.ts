import { Component , ViewChild, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Parcour } from '../../parcour.model';
import { ParcourService } from '../../parcour.service';
import { ParcourDialogComponent } from '../parcour-dialog/parcour-dialog.component';

@Component({
  selector: 'app-parcour-list',
  templateUrl: './parcour-list.component.html',
  styleUrls: ['./parcour-list.component.css']
})
export class ParcourListComponent implements OnInit{
  // IDEA : add a description for each parcour?
  displayedColumns: string[] = ['libelle','nombre','actions'];
  dataSource: MatTableDataSource<Parcour>;
  parcours: Parcour[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private parcourService: ParcourService, private parcourDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getParcours();
  }
  getParcours() {
    this.parcourService.getAll().subscribe((data: Parcour[]) => {
    this.parcours = data;
    console.log(this.parcours);
    this.dataSource = new MatTableDataSource(this.parcours);
    this.paginator._intl.itemsPerPageLabel = "Eléments par page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }
  

      applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog() {
    this.parcourDialog.open(ParcourDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getParcours();
      }
    })
  }

  openDetailsDialog(row: any) {
    this.parcourDialog.open(ParcourDialogComponent, {
      width: '30%',
      data: {
        cancelBtn:'Fermer',
        title: 'Details du parcour',
        row
      }
    })
  }

  openEditDialog(row: any) {
    this.parcourDialog.open(ParcourDialogComponent, {
      width: '30%',
      data: {
        btn:'Mettre à jour',
        title: 'Modifier le parcour',
        row
      }
    }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getParcours();
      }
    })
  }

  openDeleteDialog(id: string) {
    if (confirm('Vous voulez vraiment supprimer ce parcour?')) {
      this.parcourService.delete(Number(id)).subscribe({
        next: (res) => {
          console.log(res);
          this.getParcours();
        },
        error: () => {
          alert('Une erreur s\'est produite lors de la suppression de ce parcour');
        }
      })
    }
  }
}
