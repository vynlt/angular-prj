import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AreaService } from '../../../services/area.service';
import { of as observableOf } from 'rxjs';
@Component({
    selector: 'add-dialog',
    templateUrl: 'add.dialog.html',
    styleUrls: ['add.dialog.css']
})

export class AddDialog {
    constructor(public dialogRef: MatDialogRef<AddDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any, public dataService: AreaService
    ) { }

    formControl = new FormControl('', [
        Validators.required
        // Validators.email,
    ]);

    getErrorMessage() {
        return this.formControl.hasError('required') ? 'Required field' : '';
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    public confirmAdd(): void {
        
       this.dataService.addItem(this.data).subscribe(data => {
        this.data = data
        this.dialogRef.close({ data: this.data });
      });
      
    }

   
}