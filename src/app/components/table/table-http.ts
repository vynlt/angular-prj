import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { of as observableOf } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AreaService } from '../../services/area.service'
import { Area } from '../../interfaces/Area'
import { EditDialog } from '../dialog/EditDialog/edit.dialog'
import { AddDialog } from '../dialog/AddDialog/add.dialog';
import { DeleteDialog } from '../dialog/DeleteDialog/delete.dialog';

/**
 * @title Table retrieving data through HTTP
 */
@Component({
  selector: 'table-http',
  styleUrls: ['table-http.css'],
  templateUrl: 'table-http.html',
})

export class TableHttpExample implements OnInit {
  displayedColumns: string[] = ['Id', 'Name', 'CV', 'IsCurrent', 'LastUpdated', 'actions'];
  exampleDatabase: AreaService | null;
  dataSource: MatTableDataSource<Area[]>;
  pageSize = 0;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  index: number;
  id: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private http: HttpClient, public dialog: MatDialog, public dataService: AreaService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData = () => {
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

  startEdit(Id: string, Name: string, CV: string, IsCurrent: string) {
    this.id = Id;

    const dialogRef = this.dialog.open(EditDialog, {
      data: { Name: Name, CV: CV, IsCurrent: IsCurrent, LastUpdated: new Date() }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        this.exampleDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        this.refreshTable();
      }
    });
  }

  addNew = (Name: string, CV: string, IsCurrent: string) =>{
    const dialogRef = this.dialog.open(AddDialog, {
      data: { Id: 0, Name: Name, CV: parseInt(CV), IsCurrent: IsCurrent, LastUpdated: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        
        this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      
      }
    });

  }

  deleteItem(Id: string, Name: string, CV: string, IsCurrent: string, LastUpdated: string) {
    this.id = Id;
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { Id: Id, Name: Name, CV: parseInt(CV), IsCurrent: IsCurrent, LastUpdated: LastUpdated }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.exampleDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);

  }
}





