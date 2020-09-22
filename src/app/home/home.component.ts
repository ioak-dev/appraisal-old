import {Component, OnDestroy, OnInit} from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import {HomeService} from './home.service';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {UserService} from '../core/services/user.service';
import {AuthService} from '../core/services/auth.service';
import {CycleService} from '../core/services/cycle.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {UserType} from '../model/user-type';
import {CycleType} from '../model/cycle-type';
import {Router} from '@angular/router';
import {NotifyDialogComponent} from '../notify-dialog/notify-dialog.component';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import * as messageObject from '../message.json';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  users: UserType[];
  currentCycle: CycleType;
  loggedInUser: UserType;
  cards: any;
  cycle: any = [];
  today: any = Date.now();
  daysdiff: number;
  status: any;

  constructor(private pageHeaderService: PageHeaderService,
               private homeService: HomeService,
               private userService: UserService,
               private cycleSelectionService: CycleSelectionService,
               public authService: AuthService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar,
               private appraisalService: AppraisalService,
               private cycleService: CycleService,
               private router: Router) {
    pageHeaderService.setTitle('Home');
  }

  ngOnInit() {
    this.pageHeaderService.hideCycle();
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.loggedInUser = data;
          this.initialize();
        }
      );
    }, 100);
    this.initialize();
  }

  initialize() {
    this.homeService.getCycles().subscribe(
      cycles => {
        for (const cycle of cycles) {
          if (cycle.status === 'ACTIVE') {
            this.cycle = cycle;
            var today = new Date(this.today).getTime();
            var endDate = new Date(this.cycle.selfAppraisalDeadline).getTime();
            if (today > endDate) {
              this.daysdiff = 0;
            } else {
              this.daysdiff = Math.abs(endDate - today) / (1000 * 60 * 60 * 24);
            }
          }
        }
      }
    );
    this.homeService.getStatus().subscribe(
      status => {
        this.status = status;
      }
    );

    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      }
    );
  }

  openSupportDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {
      to: 'appraisal.westernacher@gmail.com',
      subject: 'Subject',
      body: 'Please specify your email Id while raising any question.'
    };
    const dialogRef = this.dialog.open(NotifyDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.notify(result);
      }
    });
  }

  notify(result: any) {
    this.appraisalService.notifyUser(result).subscribe(
      response =>{
        this.snackBar.open(messageObject.NOTIFY.success, null, {
          duration: 6000,
        });
      });
  }

  help() {
    this.router.navigate(['/help']);
  }

  ngOnDestroy() {
    this.pageHeaderService.showCycle();
    this.initializeCycleAndAccess();
  }

  private initializeCycleAndAccess() {
    if (sessionStorage.getItem('userSigninName') === null) {
      return;
    }

    this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
      data => {
        this.authService.isAdministrator = false;
        this.authService.isReviewer = false;
        this.authService.loggedIn = true;
        this.authService.loggedInUser = data;
        if (data.roles.find(obj => obj.type === 'Administrator')) {
          this.authService.isAdministrator = true;
        }
        if (data.roles.find(obj => obj.type === 'TeamLead') ||
          data.roles.find(obj => obj.type === 'ProjectManager') ||
          data.roles.find(obj => obj.type === 'PracticeDirector') ||
          data.roles.find(obj => obj.type === 'HR')) {
            this.authService.isReviewer = true;
        }

        this.homeService.getCycles().subscribe(
          cycles => {
            this.cycleSelectionService.activeCycles = [];
            for (const cycle of cycles) {
              if (cycle.status === 'ACTIVE') {
                this.cycleSelectionService.activeCycles.push(cycle);
              }
            }

            if (this.cycleSelectionService.activeCycles.length > 0 && (
              this.cycleSelectionService.currentCycle === undefined ||
              this.cycleSelectionService.activeCycles.find(x => x.id === this.cycleSelectionService.currentCycle.id) === undefined)
               ) {
              this.cycleSelectionService.currentCycle = this.cycleSelectionService.activeCycles[0];
              localStorage.setItem('currentCycle', JSON.stringify(this.cycleSelectionService.currentCycle));
            }

            localStorage.setItem('activeCycles', JSON.stringify(this.cycleSelectionService.activeCycles));
          });
      }
    );
  }
}
