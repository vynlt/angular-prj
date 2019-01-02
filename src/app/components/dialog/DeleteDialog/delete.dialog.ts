import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';

import { AreaService } from '../../../services/area.service';


@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete.dialog.html',
  styleUrls: ['delete.dialog.css']
})
export class DeleteDialog {

  constructor(public dialogRef: MatDialogRef<DeleteDialog>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: AreaService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    const response = this.dataService.deleteItem(this.data.Id);
    console.log(response)
  }
}