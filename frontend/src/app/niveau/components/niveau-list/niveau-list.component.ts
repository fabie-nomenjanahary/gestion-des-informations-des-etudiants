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
  displayedColumns: string[] = ['libelle'];
  dataSource: MatTableDataSource<Niveau>;
  niveaux: Niveau[];

    @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private niveauService: NiveauService, private etudiantDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getNiveaux();
  }
  getNiveaux() {
    this.niveauService.getAll().subscribe((data: Niveau[]) => {
      this.niveaux = data;
      console.log(this.niveaux);
      this.dataSource = new MatTableDataSource(this.niveaux);
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
    this.etudiantDialog.open(NiveauDialogComponent, {
      width:'30%'
    })
  }

  deleteNiveau(id: number) {
    //TODO
  }
}
