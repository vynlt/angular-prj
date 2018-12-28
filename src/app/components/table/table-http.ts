import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AreaService } from '../../services/area.service'
import { Area } from '../../interfaces/Area'

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'table-http',
  styleUrls: ['table-http.css'],
  templateUrl: 'table-http.html',
})

export class TableHttpExample implements OnInit {
  displayedColumns: string[] = ['Id', 'Name', 'CV', 'IsCurrent', 'LastUpdated'];
  exampleDatabase: AreaService | null;
  dataSource: MatTableDataSource<Area[]>;
  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient) {


  }

  ngOnInit() {
    this.exampleDatabase = new AreaService(this.http);
    this.exampleDatabase.getRepoIssues().pipe(
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.payload.value.length;
        this.pageSize = data.payload.value.length
        return data.payload.value;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      }, 70)
    });
  }
}






