import {Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-user-administration-dialog',
  templateUrl: './user-administration-dialog.component.html',
  styleUrls: ['./user-administration-dialog.component.scss']
})
export class UserAdministrationDialogComponent implements OnInit {
  roles: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {  }

  ngOnInit() {
  }
}
