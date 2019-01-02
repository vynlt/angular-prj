import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AreaService } from '../../../services/area.service';
@Component({
    selector: 'edit-dialog',
    templateUrl: 'edit.dialog.html',
    styleUrls: ['edit.dialog.css']
})

export class EditDialog {
    constructor(public dialogRef: MatDialogRef<EditDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dataService: AreaService
    ) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' :'';
    }

    

    onNoClick(): void {
        this.dialogRef.close();
    }

    stopEdit(): void {

        this.dataService.updateItem(this.data).subscribe(response => {
            this.data = response
            this.dialogRef.close({ data: this.data });
          });
      }

      
}