import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DialogComponent } from '../components/template/dialog/dialog.component';
import { ButtonType } from '../enums/button-type';
import { DialogType } from '../enums/dialog-type';

/**
 * Ui service contains methods like open dialog...
 */
@Injectable({
  providedIn: 'root'
})
export class UiService {

  /**
   * Constructor
   * @param dialog Mat dialog
   */
  constructor(private dialog: MatDialog) { }

  /**
   * Open dialog by send dialog type title and content 
   * @param dialogType Dialog type (Alert, Prompt...)
   * @param title Dialog title
   * @param content Dialog content 
   * @param width Width (optional)
   * @returns Observable that is notified when the dialog is finished closing.
   */
  openDialog(dialogType: DialogType,
    title: string,
    content: string,
    width?: string): Observable<ButtonType> {
    let dialogRef: MatDialogRef<DialogComponent> = this.dialog.open(DialogComponent, {
      width: width
    });
    dialogRef.disableClose = true;//disable default close operation
    dialogRef.componentInstance.type = dialogType;
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.content = content;
    return dialogRef.afterClosed();
  }

  /**
   * Open component in dialog
   * @param component Component name
   * @param title Dialog title
   * @param data Data (optional)
   * @param width Dialog width (optional) 
   * @returns Reference to a dialog opened via the MatDialog service
   */
  openComponentInDialog(component: any, title: string, data?: any, width?: string): MatDialogRef<any> {
    let dialogRef: MatDialogRef<any> = this.dialog.open(component, {
      width: width,
      data: { data }
    });
    dialogRef.disableClose = true;//disable default close operation
    dialogRef.componentInstance.title = title;

    return dialogRef;
  }
}
