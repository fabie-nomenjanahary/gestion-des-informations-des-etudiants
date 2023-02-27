import { Component, OnInit, ViewChild} from '@angular/core';
import { AnneeScolaire } from '../../annee-scolaire.model';
import { AnneeScolaireService } from '../../annee-scolaire.service';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
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
  displayedColumns: string[] = ['annee', 'debutAS','finAS'];
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
    })
  }

  deleteAnneeScolaire(id: number) {
    //TODO
  }
}
