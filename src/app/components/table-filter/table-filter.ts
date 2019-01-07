import { Component, ViewChild, OnInit, } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';

import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AllIOService } from '../../services/allios.service'

import { Io } from '../../interfaces/index'

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.html',
  styleUrls: ['./table-filter.css']
})
export class TableFilterExample implements OnInit {
  displayedColumns: string[] = ['Id', 'InitiatorFullName', 'Area.Name','Title', 'Status.Name',
    'RankingCategory.Name', 'RankingScore', 'RankLevelId', 'PCRNumber', 'CreatedDate',
    'ReviewedDate', 'ApprovedDate', 'SubmittedDate', 'LastUpdatedBy', 'EquipmentTags',
    'IOStakeHolders.FullName', 'EstimatedCostNZD', 'Budget'];
  exampleDatabase: AllIOService | null;
  dataSource: MatTableDataSource<Io>;
  isLoadingResults = true;
  isRateLimitReached = false;
  pageSize = 0;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private http: HttpClient, public dataService: AllIOService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
    this.exampleDatabase = new AllIOService(this.http);
    
    this.exampleDatabase.getRepoIssues().pipe(
      map(data => {
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data.payload.value.length;
        this.pageSize = data.payload.value.length
        return data.payload.value;
      }),
      catchError(() => {
        this.isLoadingResults = false;
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