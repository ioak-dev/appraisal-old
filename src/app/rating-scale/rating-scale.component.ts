import { Component, OnInit, ViewChild } from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import {AuthService} from '../core/services/auth.service';
import { RatingScaleService } from './rating-scale.service';
import { RatingScaleType } from '../model/rating-scale-type';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-rating-scale',
  templateUrl: './rating-scale.component.html',
  styleUrls: ['./rating-scale.component.scss']
})
export class RatingScaleComponent implements OnInit {
  displayedColumns: string[] = ['rating', 'appraisalCriteria', 'reviewerCriteria'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  data: RatingScaleType[];

  constructor(private ratingScaleService: RatingScaleService,
              private pageHeaderService: PageHeaderService,
              public authService: AuthService) {
    pageHeaderService.setTitle('Rating Definition');
  }

  ngOnInit() {
    this.initialize();
    this.authService.init();
  }

  initialize() {
    this.ratingScaleService.getDefinitions().subscribe(
      response => {
        this.data = response;
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('There was an error while retrieving Posts !!!' + error);
      });
  }

}
