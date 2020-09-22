import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-submit-error-dialog',
  templateUrl: './submit-error-dialog.component.html',
  styleUrls: ['./submit-error-dialog.component.scss']
})
export class SubmitErrorDialogComponent implements OnInit {
  errors: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
     this.errors = data.error.sectionOneError;
     console.log(this.errors);
  }
  ngOnInit() {
  }
}
