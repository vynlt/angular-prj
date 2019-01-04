import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TableHttpExample} from './components/table-http/table-http'
import {TableFilterExample} from './components/table-filter/table-filter'

const routes: Routes = [
    { path: '', redirectTo: '/area', pathMatch: 'full' },
    { path: 'area', component:  TableHttpExample},
    { path: 'allios', component:  TableFilterExample},
    
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }