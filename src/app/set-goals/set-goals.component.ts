import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {UserService} from './../core/services/user.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {PageHeaderService} from '../core/services/page-header.service';
import {AuthService} from '../core/services/auth.service';
import { SetGoalsDialogComponent } from '../set-goals-dialog/set-goals-dialog.component';

@Component({
  selector: 'app-set-goals',
  templateUrl: './set-goals.component.html',
  styleUrls: ['./set-goals.component.scss']
})
export class SetGoalsComponent implements OnInit {
  displayedColumns: string[] = ['empid', 'username', 'useremail', 'action'];
  dataSource: any;

  currentCycle: CycleType;
  loggedInUser: UserType;
  userNameMap: any = {};
  cycleId: string;
  userIds: string[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selfAppraisal: any;

  constructor(private cycleSelectionService: CycleSelectionService,
               private pageHeaderService: PageHeaderService,
               private userService: UserService,
               private snackBar: MatSnackBar,
               private appraisalService: AppraisalService,
               public dialog: MatDialog,
               private authService: AuthService) {
    pageHeaderService.setTitle('Set Goals');
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.ngOnInit());
  }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.loggedInUser = data;
          this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
          this.initialize();
          this.authService.init();
        }
      );
    }, 100);
  }

  initialize() {
    this.loadSelfAppraisal();
    this.getAllUsers();
    this.RenderDataTable();
  }

  loadSelfAppraisal() {
    this.appraisalService.getAppraisalbyUserId(this.currentCycle.id, this.loggedInUser.id).subscribe(
      response => {
        this.selfAppraisal = response;
      }
    );
  }

  getAllUsers() {
    this.userService.getUsers().subscribe(
      users => {
        if (users.length > 0) {
          users.forEach((item => {
            this.userNameMap[item.id] = item;
          }));
        }
      });
  }

  RenderDataTable() {
    this.cycleId = this.currentCycle.id;
    this.userIds.push(this.loggedInUser.id);
    this.appraisalService.getAppraisal(this.cycleId, this.loggedInUser.id)
      .subscribe(
      response => {
        if (response.length > 0) {
          response.forEach((item => {
            const obj = {
              userId: ''
            };
            obj.userId = item.userId;
            this.userIds.push(item.userId);
          }));
        }
        this.dataSource = new MatTableDataSource();
        response = response.concat([this.selfAppraisal]);
        this.dataSource.data = response;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.log('There was an error while retrieving Posts !!!' + error);
      });
  }

  openViewDialog(row) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '80%';
    dialogConfig.data = {
      userStatus: row.status,
      currentUser: this.userNameMap[row.userId],
      userId: row.userId
    };
    const dialogRef = this.dialog.open(SetGoalsDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      this.initialize();
    });
  }
}
