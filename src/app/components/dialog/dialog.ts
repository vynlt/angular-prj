import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject, Input} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { AreaService } from '../../services/area.service';

@Component({
    selector: 'dialog',
    templateUrl: 'dialog.html',
    styleUrls: ['dialog.css']
})

export class Dialog {
    @Input() dialogTitle: string;
    @Input() dialogBtn1: string;
    @Input() dialogBtn2: string;
    @Input() dialogSubmit: any;

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