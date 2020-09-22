import { Component, OnInit, OnDestroy } from '@angular/core';
import {PageHeaderService} from '../core/services/page-header.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {NotifyDialogComponent} from '../notify-dialog/notify-dialog.component';
import {MatDialog, MatDialogConfig, MatSnackBar} from '@angular/material';
import * as messageObject from '../message.json';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit, OnDestroy {

  constructor(private pageHeaderService: PageHeaderService,
               public dialog: MatDialog,
               private snackBar: MatSnackBar,
               private appraisalService: AppraisalService) {
    pageHeaderService.setTitle('Help');
  }

  ngOnInit() {
    this.pageHeaderService.hideCycle();
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

  ngOnDestroy() {
    this.pageHeaderService.showCycle();
  }

}
