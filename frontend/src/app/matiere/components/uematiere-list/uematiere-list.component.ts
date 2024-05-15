import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Matiere } from '../../matiere.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatiereService } from '../../matiere.service';

@Component({
  selector: 'app-uematiere-list',
  templateUrl: './uematiere-list.component.html',
  styleUrls: ['./uematiere-list.component.css']
})
export class UEMatiereListComponent {
  // matiereForm: FormGroup;
  // parcours: Parcour[];
  // semestres: Semestre[];
  // btn: string = 'Enregistrer';
  cancelBtn: string = '';
  title: string = '';
  isDetails: boolean = false;
  displayedColumns: string[] = ['nom','ET','ED','EP', 'creditEC','poidsEC','actions'];
  dataSource: MatTableDataSource<Matiere>;
  matieres: Matiere[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    // private fb: FormBuilder, private matiereService: MatiereService, private router: Router,
    private matiereService: MatiereService,
    @Inject(MAT_DIALOG_DATA) public data:any,
    private dialogRef: MatDialogRef<UEMatiereListComponent>
  ) {
     }

  ngOnInit(): void {
        this.getMatieres(this.data.row.id);
    // this.getParcours();
    // this.getSemestres();
    // this.createForm();
    if (this.data) {
    //   if (this.data.btn) {
    //     this.btn = this.data.btn;
    //   }
    //   if (this.data.cancelBtn) {
        this.cancelBtn = this.data.cancelBtn;
    //     this.isDetails = true;
    //   }
    //   if (this.isDetails) {
    //     this.matiereForm.disable();
    //     Object.values(this.matiereForm.controls).forEach(control => {
    //       control.setValidators(null);
    //     });
    //   }
      this.title = this.data.title+''+this.data.row.nom;
    //   this.matiereForm.controls['nom'].setValue(this.data.row.nom);
    //   this.matiereForm.controls['creditUE'].setValue(this.data.row.creditUE);
    //   this.matiereForm.controls['parcour_id'].setValue(this.data.row.parcour_id);
    //   this.matiereForm.controls['sem_id'].setValue(this.data.row.sem_id);
     }
  }
  createForm() {
// this.matiereForm = this.fb.group(
//       {
//         nom:['',Validators.required],
//         creditUE:['',Validators.required],
//         parcour_id:['',Validators.required],
//         sem_id:['',Validators.required]
//       }
//     )
  }
  // get myMatiereForm() {
  //   return this.matiereForm.controls;
  // }

//  getParcours() {
//     this.parcourService.getAll().subscribe((data: Parcour[]) => {
//       this.parcours = data;

//     })
//   }
  // getSemestres() {
  //     this.semestreService.getAllSemestres().subscribe((data: Semestre[]) => {
  //       this.semestres = data;
  //     })

  // }

  // addMatiere() {
  //     if (this.matiereForm.valid) {

  //       let matiere: Matiere = new Matiere();

  //       matiere.nom = this.matiereForm.value.nom;
  //       matiere.creditUE = this.matiereForm.value.creditUE;
  //       matiere.parcour_id = Number(this.matiereForm.value.parcour_id);
  //       matiere.sem_id = Number(this.matiereForm.value.sem_id);

  //       if (!this.data) {
  //         // TODO : show error/success message(s)
  //         this.matiereService.create(matiere).subscribe({
  //           next: (res) => {
  //             this.matiereForm.reset();
  //             this.dialogRef.close('save');
  //           },
  //           error: (res) => {
  //             console.log(res);

  //             alert("Une erreur s'est produite lors de l'ajout de cette unité d'enseignement");
  //           }
  //         })
  //       } else {
  //         // TODO : show error/success message(s)
  //         console.log(this.data.row);
  //         this.matiereService.update(Number(this.data.row.id),matiere).subscribe({
  //           next: (res) => {
  //             this.matiereForm.reset();
  //             this.dialogRef.close('update');
  //           },
  //           error: () => {
  //             alert("Une erreur s'est produite lors de la modification de cette unité d'enseignement");
  //           }
  //         })
  //       }
  //     } else {
  //       console.log('Invalid information');
  //     }
  // }
 getMatieres(UE_id:number) {
    this.matiereService.getAllWhereUE(UE_id).subscribe((data: Matiere[]) => {
    this.matieres = data;
    console.log(this.matieres);

    this.dataSource = new MatTableDataSource(this.matieres);
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
    // this.matiereDialog.open(MatiereDialogComponent, {
    //   width:'30%'
    // }).afterClosed().subscribe(val => {
    //   if (val==='save') {
    //     this.getMatieres();
    //   }
    // })
  }
  openEditDialog(row: any) {
    // this.matiereDialog.open(MatiereDialogComponent, {
    //   width: '30%',
    //   data: {
    //     btn:'Mettre à jour',
    //     title: 'Modifier cette unité d\'enseignement',
    //     row
    //   }
    // }).afterClosed().subscribe(val => {
    //   if (val==='update') {
    //     this.getMatieres();
    //   }
    // })
  }
openDeleteDialog(id: string) {
  //   this.confirmDialogService.openMatConfirmDialog('Vous voulez vraiment supprimer cette unité d\'enseignement?')
  //     .afterClosed().subscribe(res => {
  //       if (res) {
  //         this.matiereService.delete(Number(id)).subscribe({
  //           next: (res) => {
  //             console.log(res);
  //             this.getMatieres();
  //           },
  //           error: () => {
  //             alert('Une erreur s\'est produite lors de la suppression de cette unité d\'enseignement');
  //           }
  //     })
  //   }
  // });
  }
}
