import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatConfirmDialogComponent } from './components/mat-confirm-dialog/mat-confirm-dialog.component';
@Injectable({
  providedIn: 'root'
})
export class MatConfirmDialogService {

  constructor(private dialog : MatDialog) { }
  openMatConfirmDialog(msg){
    return this.dialog.open(MatConfirmDialogComponent,{
      width : '390px',
      panelClass : 'confirm-dialog-container',
      disableClose : true,
      data : {
        message : msg
      }
    });
  }
}
