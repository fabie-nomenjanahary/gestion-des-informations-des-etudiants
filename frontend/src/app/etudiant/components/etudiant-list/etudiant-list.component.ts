import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EtudiantService } from '../../etudiant.service';
import { EtudiantDialogComponent } from '../etudiant-dialog/etudiant-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatConfirmDialogService } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.service';

@Component({
  selector: 'app-etudiant-list',
  templateUrl: './etudiant-list.component.html',
  styleUrls: ['./etudiant-list.component.css']
})
export class EtudiantListComponent implements OnInit{

  displayedColumns: string[] = ['matricule', 'nom','prenom','dateNais', 'parcour','actions'];
  dataSource: MatTableDataSource<any>;
  etudiants: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private etudiantService: EtudiantService,
    private etudiantDialog: MatDialog,
    private confirmDialogService : MatConfirmDialogService) { }

  ngOnInit(): void {
    this.getEtudiants();
  }
  getEtudiants() {
    this.etudiantService.getAll().subscribe((data: any[]) => {
    this.etudiants = data;
    console.log(this.etudiants);
    this.dataSource = new MatTableDataSource(this.etudiants);
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
    this.etudiantDialog.open(EtudiantDialogComponent, {
      width:'40%',
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getEtudiants();
      }
    })
  }
  openDetailsDialog(row:any) {
   this.etudiantDialog.open(EtudiantDialogComponent, {
     width: '40%',
     data: {
       cancelBtn: 'Fermer',
       title:'Details de l\'étudiant',
       row
     },
   })
  }
  openEditDialog(row:any) {
   this.etudiantDialog.open(EtudiantDialogComponent, {
     width: '40%',
     data: {
       btn: 'Mettre à jour',
       title:'Modifier l\'étudiant',
       row
     },

   }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getEtudiants();
      }
    })
  }
  openDeleteDialog(id:string) {
    this.confirmDialogService.openMatConfirmDialog('Vous voulez vraiment supprimer cet étudiant?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.etudiantService.delete(Number(id)).subscribe({
          next: (res) => {
            this.getEtudiants();
          },
          error: () => {
            alert("Une erreur s'est produite lors de la suppression de cet étudiant");
          }
        })
      }
    });
  }
}
