import { Component, OnInit, ViewChild} from '@angular/core';
import { AnneeScolaire } from '../../annee-scolaire.model';
import { AnneeScolaireService } from '../../annee-scolaire.service';
import { MatDialog } from "@angular/material/dialog";
import { AnneeScolaireDialogComponent } from '../annee-scolaire-dialog/annee-scolaire-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-annee-scolaire-list',
  templateUrl: './annee-scolaire-list.component.html',
  styleUrls: ['./annee-scolaire-list.component.css']
})
export class AnneeScolaireListComponent implements OnInit{
  displayedColumns: string[] = ['annee', 'debutAS','finAS','actions'];
  dataSource: MatTableDataSource<AnneeScolaire>;
  anneeScolaires: AnneeScolaire[];

  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    this.dataSource = new MatTableDataSource(this.anneeScolaires);
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
    this.ASDialog.open(AnneeScolaireDialogComponent, {
      width:'30%'
    }).afterClosed().subscribe(val => {
      if (val==='save') {
        this.getAnneeScolaires();
      }
    })
  }

  openDetailsDialog(row: any) {
    this.ASDialog.open(AnneeScolaireDialogComponent, {
      width: '30%',
      data: {
        cancelBtn:'Fermer',
        title: 'Details de l\'année scolaire',
        row
      }
    })
  }

  openEditDialog(row: any) {
    this.ASDialog.open(AnneeScolaireDialogComponent, {
      width: '30%',
      data: {
        btn:'Mettre à jour',
        title: 'Modifier l\'année scolaire',
        row
      }
    }).afterClosed().subscribe(val => {
      if (val==='update') {
        this.getAnneeScolaires();
      }
    })
  }

  openDeleteDialog(id: string) {
    if (confirm('Vous voulez vraiment supprimer cette année scolaire?')) {
      this.anneeScolaireService.delete(Number(id)).subscribe({
        next: (res) => {
          console.log(res);
          this.getAnneeScolaires();
        },
        error: () => {
          alert('Une erreur s\'est produite lors de la suppression de cette année scolaire');
        }
      })
    }
  }
}
