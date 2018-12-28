import './polyfills';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './material-module';

import { TableHttpExample } from './app/components/table/table-http';

import { EditDialog } from './app/components/dialog/EditDialog/edit.dialog'
import { AddDialog } from './app/components/dialog/AddDialog/add.dialog'
import {DeleteDialog} from './app/components/dialog/DeleteDialog/delete.dialog'

@NgModule({

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    DemoMaterialModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    TableHttpExample,
    EditDialog,
    AddDialog,
    DeleteDialog
  ],
  declarations: [
    TableHttpExample,
    EditDialog,
    AddDialog,
    DeleteDialog
  ],
  bootstrap: [
    TableHttpExample,],
  providers: []
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);


/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */