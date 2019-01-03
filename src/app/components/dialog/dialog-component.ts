import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AreaService } from '../../services/area.service';
@Component({
    selector: 'dialog-component',
    templateUrl: 'dialog-component.html',
    styleUrls: ['dialog-component.css']
})

export class Dialog {
    public dialogTitle: string;
    public dialogBtn1: string;
    public dialogBtn2: string;
    public dialogSubmit = new EventEmitter();
    public body: boolean;

    constructor(public dialogRef: MatDialogRef<Dialog>,
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
        this.dialogSubmit.emit(this.data);
      }

      
}