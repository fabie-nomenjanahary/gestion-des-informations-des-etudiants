import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Etudiant } from '../../etudiant.model';
import { EtudiantService } from '../../etudiant.service';
import { EtudiantDialogComponent } from '../etudiant-dialog/etudiant-dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

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
  
  constructor(private etudiantService: EtudiantService, private etudiantDialog: MatDialog) { }
  
  ngOnInit(): void {
    this.getEtudiants();
  }
  getEtudiants() {
    this.etudiantService.getAll().subscribe((data: any[]) => {
    this.etudiants = data;
    console.log(this.etudiants);
    this.dataSource = new MatTableDataSource(this.convertData(this.etudiants));
    this.paginator._intl.itemsPerPageLabel = "Eléments par page";
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  } 
 
  convertData(etudiants: any[]) {
   let converted_etudiants: any[]=[];
    etudiants.forEach(etudiant => {
      etudiant = {
        id: etudiant.id,
        matricule: etudiant.matricule,
        personne_id: etudiant.personne_id,
        nom: etudiant.personne.nom,
        prenom: etudiant.personne.prenom,
        dateNais: etudiant.personne.dateNais,
        lieuNais: etudiant.personne.lieuNais,
        adresse: etudiant.personne.adresse,
        tel: etudiant.personne.tel,
        mail: etudiant.personne.mail,
        parcour_id: etudiant.parcour_id,
        parcour: etudiant.parcour.libelle,
        // TODO : niveau & annee scolaire actuel
        niveaux:this.myToString(etudiant.niveaux)
      }
      converted_etudiants.push(etudiant);
    });
    console.log(converted_etudiants);
    return converted_etudiants;
  }

  myToString(niveaux: []) {
    
    return '';
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
    })
  }
  openDetailsDialog(row:any) {
   this.etudiantDialog.open(EtudiantDialogComponent, {
     width: '40%',
     data: {
       btn: 'Ok',
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
     
   })
  }
  openDeleteDialog(id:string) {
    if (confirm('Vous voulez vraiment le supprimer?')) {
      this.deleteEtudiant(Number(id));
    }
  }
  deleteEtudiant(id: number) {
    console.log('deleting....')
    //TODO
  }
}
