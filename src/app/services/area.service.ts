import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {Area, AreaApi, AreaApiUpdate, AreaApiDelete } from '../interfaces/index'
import * as Utils from '../utils/apiUtils'
import {URL} from '../constants/index'


@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private httpClient: HttpClient) { }

  getRepoIssues(): Observable<AreaApi> {
    const href = URL.root + URL.areaRoute;
    const requestUrl =
      `${href}?orderby=Name%20asc`;
    return this.httpClient.get<AreaApi>(requestUrl, Utils.getHttpOptions(null));
  }

  addItem(area: Area): Observable<AreaApiUpdate> {
    const href = URL.root + URL.areaRoute;
    const requestUrl = href;
   return this.httpClient.post<AreaApiUpdate>(requestUrl, area, Utils.getHttpOptions(area))
  }

  updateItem(area: Area): Observable<AreaApiUpdate> {
    const href = URL.root + URL.areaRoute;
    const requestUrl = `${href}(${area.Id})`;
     return this.httpClient.put<AreaApiUpdate>(requestUrl, area, Utils.getHttpOptions(area));
  }

  deleteItem(id: string): Observable<AreaApiDelete> {
    const href = URL.root + URL.areaRoute;
    const requestUrl = `${href}(${id})`;
   return this.httpClient.delete<AreaApiDelete>(requestUrl, Utils.getHttpOptions(null));
  }

}


