import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { AreaApi } from '../interfaces/AreaApi'
import { Area } from '../interfaces/Area'
import * as Utils from '../utils/apiUtils'
import {  map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'guid': '289d10cb-639b-43f3-9fc1-b232e5ae3371',
    'hmac': Utils.getHmacString(null)
  })
}

const URL = {
  root: "http://toddenergy.australiasoutheast.cloudapp.azure.com:8080/",
  route: "areas",
  query: "orderby=Name%20asc"
}

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  dataChange: BehaviorSubject<Area[]> = new BehaviorSubject<Area[]>([]);
  dialogData: any;
  dataSource: any;

  constructor(private httpClient: HttpClient) { }



  getRepoIssues(): Observable<AreaApi> {
    const href = URL.root + URL.route;
    const requestUrl =
      `${href}?${URL.query}`;
    return this.httpClient.get<AreaApi>(requestUrl, httpOptions);
  }

  get data(): Area[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  getDataSource() {
    return this.dataSource;
  }

  getHttpOptions = (data) => {
    return {
      headers: new HttpHeaders({
        'guid': '289d10cb-639b-43f3-9fc1-b232e5ae3371',
        'hmac': Utils.getHmacString(data)
      })
    }

  }
  addItem(area: Area): Observable<Area> {
    const href = URL.root + URL.route;
    const requestUrl = href;
   return this.httpClient.post<Area>(requestUrl, area, this.getHttpOptions(area))
  }

  updateItem(area: Area): void {
    const href = URL.root + URL.route;
    const requestUrl = `${href}(${area.Id})`;
    this.httpClient.put<Area>(requestUrl, area, this.getHttpOptions(area)).subscribe(data => {
      this.dialogData = area;
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }

  deleteItem(id: string): void {
    const href = URL.root + URL.route;
    const requestUrl = `${href}(${id})`;
    this.httpClient.delete(requestUrl, this.getHttpOptions(null)).subscribe(data => {
      console.log(data);
    },
      (err: HttpErrorResponse) => {
        console.log('Error occurred. Details: ' + err.name + ' ' + err.message);
      }
    );
  }


}


