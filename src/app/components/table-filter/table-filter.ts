import { Component, ViewChild,OnInit,  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator } from '@angular/material';

import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import {AllIOService} from '../../services/allios.service'

@Component({
  selector: 'table-filter',
  templateUrl: './table-filter.html',
  styleUrls: ['./table-filter.css']
})
export class TableFilterExample implements OnInit {
    displayedColumns: string[] = ['Id', 'InitiatorFullName', 'Area.Name', 'Status.Name', 
    'RankingCategory.Name', 'RankingScore' , 'RankLevelId', 'PCRNumber', 'CreatedDate', 
    'ReviewedDate', 'ApprovedDate', 'SubmittedDate', 'LastUpdatedBy', 'EquipmentTags', 
    'IOStakeHolders.FullName', 'EstimatedCostNZD', 'Budget'];
    exampleDatabase: AllIOService | null;
    dataSource: any;
    isLoadingResults = true;
    isRateLimitReached = false;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(private http: HttpClient, public dataService:AllIOService) {
    }

    ngOnInit() {
        this.loadData();
      }
 
      loadData = () => {
        this.exampleDatabase = new AllIOService(this.http);
        this.exampleDatabase.getRepoIssues().pipe(
          map(data => {
            console.log(data)
            return data;
          }),
          catchError(() => {
            this.isLoadingResults = false;
            this.isRateLimitReached = true;
            return observableOf([]);
          })
        ).subscribe(data => {
          
        });
      }
}