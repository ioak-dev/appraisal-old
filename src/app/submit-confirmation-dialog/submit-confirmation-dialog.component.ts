import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-submit-confirmation-dialog',
  templateUrl: './submit-confirmation-dialog.component.html',
  styleUrls: ['./submit-confirmation-dialog.component.scss']
})
export class SubmitConfirmationDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

  proceed() {
    this.data.proceed = true;
  }
}
