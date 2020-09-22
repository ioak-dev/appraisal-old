import {Component, OnInit, Input} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-self-appraisal-sectionfive',
  templateUrl: './self-appraisal-sectionfive.component.html',
  styleUrls: ['./self-appraisal-sectionfive.component.scss']
})
export class SelfAppraisalSectionfiveComponent implements OnInit {

  currentCycle: CycleType;
  sectionResponse: string;
  @Input() currentUser: UserType;
  @Input() appraisalVisibility: string;
  @Input() reviewerVisibility: string;

  constructor(private cycleSelectionService: CycleSelectionService,
              private appraisalService: AppraisalService, private userService: UserService, private snackBar: MatSnackBar) {
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.initialize();
        }
      );
    }, 100);
  }

  initialize() {
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    this.loadAdditionalComment();

  }

  loadAdditionalComment() {
    this.appraisalService.getSectionfivebyUserId(this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        if (response) {
          this.sectionResponse = response.sectionfive;
        }
      }
    );
  }

  save() {
    const jsonObj = {
      'sectionfive': this.sectionResponse
    };
    this.appraisalService.saveSectionFiveFeedback(jsonObj, this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.snackBar.open('Response Auto Saved', '', {
          duration: 3000,
          panelClass: ['custom-auto-save']
        });
      }
    );
  }

}
