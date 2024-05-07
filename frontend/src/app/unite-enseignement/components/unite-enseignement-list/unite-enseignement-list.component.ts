import { Component, ViewChild } from '@angular/core';
import { UniteEnseignement } from '../../unite-enseignement.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UniteEnseignementService } from '../../unite-enseignement.service';
import { MatConfirmDialogService } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.service';
import { MatDialog } from '@angular/material/dialog';
import { UniteEnseignementDialogComponent } from '../unite-enseignement-dialog/unite-enseignement-dialog.component';
import { MatiereDialogComponent } from 'src/app/matiere/components/matiere-dialog/matiere-dialog.component';

@Component({
  selector: 'app-unite-enseignement-list',
  templateUrl: './unite-enseignement-list.component.html',
  styleUrls: ['./unite-enseignement-list.component.css']
})
export class UniteEnseignementListComponent {
  displayedColumns: string[] = ['nom','creditUE','parcours','niveau', 'semestre','matieres','actions'];
  dataSource: MatTableDataSource<UniteEnseignement>;
  uniteEnseignements: UniteEnseignement[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private uniteEnseignementService: UniteEnseignementService,
    private confirmDialogService : MatConfirmDialogService,
    private uniteEnseignementDialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getUniteEnseignements();
  }
  getUniteEnseignements() {
    this.uniteEnseignementService.getAll().subscribe((data: UniteEnseignement[]) => {
    this.uniteEnseignements = data;
    console.log(this.uniteEnseignements);

    this.dataSource = new MatTableDataSource(this.uniteEnseignements);
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
    this.uniteEnseignementDialog.open(UniteEnseignementDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getUniteEnseignements();
      }
    })
  }

  openDetailsDialog(row: any) {
    this.uniteEnseignementDialog.open(UniteEnseignementDialogComponent, {
      width: '30%',
      data: {
        cancelBtn:'Fermer',
        title: 'Details de l\'unité d\'enseignement',
        row
      }
    })
  }

  openEditDialog(row: any) {
    this.uniteEnseignementDialog.open(UniteEnseignementDialogComponent, {
      width: '30%',
      data: {
        btn:'Mettre à jour',
        title: 'Modifier cette unité d\'enseignement',
        row
      }
    }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getUniteEnseignements();
      }
    })
  }
openDeleteDialog(id: string) {
    this.confirmDialogService.openMatConfirmDialog('Vous voulez vraiment supprimer cette unité d\'enseignement?')
      .afterClosed().subscribe(res => {
        if (res) {
          this.uniteEnseignementService.delete(Number(id)).subscribe({
            next: (res) => {
              console.log(res);
              this.getUniteEnseignements();
            },
            error: () => {
              alert('Une erreur s\'est produite lors de la suppression de cette unité d\'enseignement');
            }
      })
    }
  });
  }
  openAddMatiereDialog(row: any) {
    console.log(row);
    this.uniteEnseignementDialog.open(MatiereDialogComponent, {
          width: '30%',
          data: {
            btn:'Mettre à jour',
            title: 'Ajouter une matière à cette unité d\'enseignement',
            row
          }
        }).afterClosed().subscribe(val => {
          if (val==='addMatiere') {
            this.getUniteEnseignements();
          }
    })
  }
}
