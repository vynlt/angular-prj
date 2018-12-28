import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {AreaApi} from '../interfaces/AreaApi'
import  * as Utils from '../utils/apiUtils'

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
  constructor(private http: HttpClient) { }
  getRepoIssues(): Observable<AreaApi> {
    const href = URL.root + URL.route;
    const requestUrl =
      `${href}?${URL.query}`;
    return this.http.get<AreaApi>(requestUrl, httpOptions);
  }
}


