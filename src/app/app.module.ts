import '../polyfills';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../material-module';

import { TableHttpExample } from './components/table-http/table-http';
import {TableFilterExample} from './components/table-filter/table-filter'
import { Dialog } from './components/dialog/dialog-component';
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        DemoMaterialModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    entryComponents: [
        TableHttpExample,
        TableFilterExample,
        Dialog
    ],
    declarations: [
        AppComponent,
        TableHttpExample,
        TableFilterExample,
        Dialog,
    ],
    bootstrap: [
        AppComponent],
    providers: []
})
export class AppModule { }