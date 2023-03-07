import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Niveau } from '../../niveau.model';
import { NiveauService } from '../../niveau.service';
import { NiveauDialogComponent } from '../niveau-dialog/niveau-dialog.component';

@Component({
  selector: 'app-niveau-list',
  templateUrl: './niveau-list.component.html',
  styleUrls: ['./niveau-list.component.css']
})
export class NiveauListComponent implements OnInit{
  displayedColumns: string[] = ['libelle','nombre','actions'];
  dataSource: MatTableDataSource<Niveau>;
  niveaux: Niveau[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private niveauService: NiveauService, private niveauDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getNiveaux();
  }
  getNiveaux() {
    this.niveauService.getAll().subscribe((data: Niveau[]) => {
    this.niveaux = data;
    console.log(this.niveaux);
    this.dataSource = new MatTableDataSource(this.niveaux);
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
    this.niveauDialog.open(NiveauDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getNiveaux();
      }
    })
  }

  openDetailsDialog(row: any) {
    this.niveauDialog.open(NiveauDialogComponent, {
      width: '30%',
      data: {
        cancelBtn:'Fermer',
        title: 'Details du niveau',
        row
      }
    })
  }

  openEditDialog(row: any) {
    this.niveauDialog.open(NiveauDialogComponent, {
      width: '30%',
      data: {
        btn:'Mettre à jour',
        title: 'Modifier le niveau',
        row
      }
    }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getNiveaux();
      }
    })
  }

  openDeleteDialog(id: string) {
    if (confirm('Vous voulez vraiment supprimer ce niveau?')) {
      this.niveauService.delete(Number(id)).subscribe({
        next: (res) => {
          console.log(res);
          this.getNiveaux();
        },
        error: () => {
          alert('Une erreur s\'est produite lors de la suppression de ce niveau');
        }
      })
    }
  }
}
