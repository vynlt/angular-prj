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


  constructor(private httpClient: HttpClient) { }



  getRepoIssues(): Observable<AreaApi> {
    const href = URL.root + URL.route;
    const requestUrl =
      `${href}?${URL.query}`;
    return this.httpClient.get<AreaApi>(requestUrl, httpOptions);
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

  updateItem(area: Area): Observable<Area> {
    const href = URL.root + URL.route;
    const requestUrl = `${href}(${area.Id})`;
     return this.httpClient.put<Area>(requestUrl, area, this.getHttpOptions(area));
  }

  deleteItem(id: string): Observable<{}> {
    const href = URL.root + URL.route;
    const requestUrl = `${href}(${id})`;
   return this.httpClient.delete(requestUrl, this.getHttpOptions(null));
  }


}


