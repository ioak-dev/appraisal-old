import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-text-input-dialog',
  templateUrl: './text-input-dialog.component.html',
  styleUrls: ['./text-input-dialog.component.scss']
})
export class TextInputDialogComponent implements OnInit {
  dialogTitle: string;
  dialogPlaceholder: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogTitle = data.title;
    this.dialogPlaceholder = data.placeholder;
  }
  ngOnInit() {
  }
}
