import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EnseignantService } from '../../enseignant.service';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogService } from 'src/app/mat-confirm-dialog/mat-confirm-dialog.service';
import { EnseignantDialogComponent } from '../enseignant-dialog/enseignant-dialog.component';

@Component({
  selector: 'app-enseignant-list',
  templateUrl: './enseignant-list.component.html',
  styleUrls: ['./enseignant-list.component.css']
})
export class EnseignantListComponent {
  displayedColumns: string[] = ['matricule', 'nom','prenom','dateNais','actions'];
  dataSource: MatTableDataSource<any>;
  enseignants: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private enseignantService: EnseignantService,
    private enseignantDialog: MatDialog,
    private confirmDialogService : MatConfirmDialogService) { }

  ngOnInit(): void {
    this.getEnseignants();
  }
  getEnseignants() {
    this.enseignantService.getAll().subscribe((data: any[]) => {
    this.enseignants = data;
    this.dataSource = new MatTableDataSource(this.convertData(this.enseignants));
    this.paginator._intl.itemsPerPageLabel = "Eléments par page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }

  convertData(enseignants: any[]) {
   let converted_enseignants: any[]=[];
    enseignants.forEach(enseignant => {
      enseignant = {
        id: enseignant.id,
        matricule: enseignant.matricule,
        personne_id: enseignant.personne_id,
        nom: enseignant.personne.nom,
        prenom: enseignant.personne.prenom,
        dateNais: enseignant.personne.dateNais,
        lieuNais: enseignant.personne.lieuNais,
        adresse: enseignant.personne.adresse,
        tel: enseignant.personne.tel,
        mail: enseignant.personne.mail,
        grade: enseignant.grade,
        titre: enseignant.titre
      }
      converted_enseignants.push(enseignant);
    });
    return converted_enseignants;
  }
    applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openDialog() {
    this.enseignantDialog.open(EnseignantDialogComponent, {
      width:'40%',
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getEnseignants();
      }
    })
  }
  openDetailsDialog(row:any) {
   this.enseignantDialog.open(EnseignantDialogComponent, {
     width: '40%',
     data: {
       cancelBtn: 'Fermer',
       title:'Details de l\'enseignant',
       row
     },
   })
  }
  openEditDialog(row:any) {
   this.enseignantDialog.open(EnseignantDialogComponent, {
     width: '40%',
     data: {
       btn: 'Mettre à jour',
       title:'Modifier l\'enseignant',
       row
     },

   }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getEnseignants();
      }
    })
  }
  openDeleteDialog(id:string) {
    this.confirmDialogService.openMatConfirmDialog('Vous voulez vraiment supprimer cet enseignant?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.enseignantService.delete(Number(id)).subscribe({
          next: (res) => {
            this.getEnseignants();
          },
          error: () => {
            alert("Une erreur s'est produite lors de la suppression de cet enseignant");
          }
        })
      }
    });
  }
}
