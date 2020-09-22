import { Component, OnInit, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';
import {PageHeaderService} from '../core/services/page-header.service';
import {AuthService} from '../core/services/auth.service';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import {NotifyDialogComponent} from '../notify-dialog/notify-dialog.component';
import * as messageObject from '../message.json';
import {AppraisalService} from '../core/services/appraisal.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

    loggedIn: boolean;

    constructor(private router: Router,
                private pageHeaderService: PageHeaderService,
                public dialog: MatDialog,
                private appraisalService: AppraisalService,
                private snackBar: MatSnackBar,
                private authService: AuthService) {
      this.pageHeaderService.setTitle('Login');
      this.pageHeaderService.hideCycle();
    }

    ngOnInit() {
      this.initialize();
      this.authService.init();
    }

    refresh() {
      window.location.reload();
    }

    initialize() {
      this.loggedIn = false;
      if (sessionStorage.getItem('idToken') !== null) {
        this.loggedIn = true;
      }
    }

    logout(): void {
      sessionStorage.clear();
      localStorage.clear();
      this.refresh();
      this.authService.clear();
      this.initialize();
    }

  help() {
    this.router.navigate(['/help']);
  }



  notify(result: any) {
    this.appraisalService.notifyUser(result).subscribe(
      response => {
        this.snackBar.open(messageObject.NOTIFY.success, null, {
          duration: 6000,
        });
      });
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

  ngOnDestroy(): void {
    this.pageHeaderService.showCycle();
  }

}
