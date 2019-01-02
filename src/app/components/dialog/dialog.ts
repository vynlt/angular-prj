import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AreaService } from '../../services/area.service';

@Component({
    selector: 'dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.css']
})

export class Dialog {
     dialogTitle: string;
     dialogBtn1: string;
     dialogBtn2: string;
     dialogSubmit = new EventEmitter();

     onSubmitClick() {
       this.dialogSubmit.emit(this.data);
     }

    constructor(public dialogRef: MatDialogRef<Dialog>,
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