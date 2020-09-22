import {Component, OnInit, Input} from '@angular/core';
import {CycleSelectionService} from '../core/services/cycle-selection.service';
import {AppraisalService} from '../core/services/appraisal.service';
import {CycleType} from '../model/cycle-type';
import {UserType} from '../model/user-type';
import {UserService} from '../core/services/user.service';
import {MatSnackBar} from '@angular/material';

export interface IReviewResponse {
 group: string;
 response: IResponse[];
}

export interface IResponse {
  criteria: string;
  weightage:  number;
  description: string;
  selfComment:  string;
  selfRating: string;
  teamLeadReviews: Map<string, IReview>;
  projectManagerReviews: Map<string, IReview>;
  practiceDirectorReviews: Map<string, IReview>;
  hrReviews: Map<string, IReview>;
  customDescription:  string;
  customWeightage: string;
}

export interface IReview {
  comment: string;
  rating: string;
  name: string;
  complete: boolean;
  roleType: string;
}

@Component({
  selector: 'app-self-appraisal-sectionone',
  templateUrl: './self-appraisal-sectionone.component.html',
  styleUrls: ['./self-appraisal-sectionone.component.scss']
})
export class SelfAppraisalSectiononeComponent implements OnInit {

  currentCycle: CycleType;
  sectionResponses: IReviewResponse[] = [];
  ratings: string[] = [
    '1 - Deficient',
    '2 - Improvements Required',
    '3 - Meets Expectations',
    '4 - Above Expectations',
    '5 - Excellent'
  ];
  @Input() appraisalVisibility: string;
  @Input() reviewerVisibility: string;
  @Input() currentUser: UserType;
  @Input() currentStatus: string;
  @Input() showSetGoals: boolean;

  score: any = [[0.0, 0.0], [0.0, 0.0]];
  totalScore: number;
  loggedInUser: UserType;

  reviewerData = {
    rating: '',
    comment: ''
  };

  constructor(private cycleSelectionService: CycleSelectionService,
               private appraisalService: AppraisalService, private userService: UserService, private snackBar: MatSnackBar) {
    cycleSelectionService.cycleChangedEvent.subscribe(data => this.initialize());
  }

  ngOnInit() {
    setTimeout(() => {
      this.userService.getUsersByEmail(sessionStorage.getItem('userSigninName').toLowerCase()).subscribe(
        data => {
          this.loggedInUser = data;
          this.initialize();
        }
      );
    }, 100);
  }

  initialize() {
    this.currentCycle = JSON.parse(localStorage.getItem('currentCycle'));
    if (!this.currentUser) {
      this.currentUser = this.loggedInUser;
    }
    this.loadQuestions();
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  loadQuestions() {
    this.appraisalService.getSectiononebyUserId(this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.sectionResponses = response;
        this.calculateScore();
      }
    );
  }

  save(responseObject) {
    this.appraisalService.saveSectionOneFeedback(responseObject, this.currentCycle.id, this.currentUser.id).subscribe(
      response => {
        this.snackBar.open('Response Auto Saved', '', {
          duration: 3000,
          panelClass: ['custom-auto-save']
        });
      }
    );
    this.calculateScore();
  }

  findReviewType(roleType) {
    let reviewType = null;
    switch (roleType) {
      case 'ProjectManager':
        reviewType = 'projectManagerReviews';
        break;
      case 'TeamLead':
        reviewType = 'teamLeadReviews';
        break;
      case 'PracticeDirector':
        reviewType = 'practiceDirectorReviews';
        break;
      default:
        reviewType = 'hrReviews';
    }

    return reviewType;
  }

  submitReview() {
    console.log(this.sectionResponses);
  }

  saveReview(sectionResponseObj, responseObj, roleType, isComplete) {
    if (!isComplete) {
      const reviewType = this.findReviewType(roleType);
      this.appraisalService.saveSectionOneReviewerFeedback([
        {
          'group': sectionResponseObj.group,
          'criteria': responseObj.criteria,
          'reviewerId': this.loggedInUser.id,
          'rating': responseObj[reviewType][this.loggedInUser.id].rating,
          'comment': responseObj[reviewType][this.loggedInUser.id].comment,
          'roleType': roleType
        }
      ], this.currentCycle.id, this.currentUser.id, this.loggedInUser.id).subscribe(
        response => {
          this.snackBar.open('Response Auto Saved', '', {
            duration: 3000,
            panelClass: ['custom-auto-save']
          });
        }
      );
    }
    this.calculateScore();
  }

  calculateScore() {
    this.score = [];
    this.totalScore = 0.0;
    this.sectionResponses.forEach(obj => {
      const element = [];
      obj.response.forEach(item => {
        if (item.practiceDirectorReviews[this.loggedInUser.id]) {
          for (const property in item.practiceDirectorReviews) {
            if (property) {
              element.push(this.getScore(item.weightage, item.practiceDirectorReviews[property].rating));
            }
          }
        } else {
          element.push('');
        }
      });
      this.score.push(element);
      const flatArr = this.score.flat();
      const arrAvg = arr => arr.reduce((a, b) => a + b);
      this.totalScore = arrAvg(flatArr);
    });
  }

  private getScore(weightage: number, reviewerRating: any) {
    let rating = 1;
    if (reviewerRating === '1 - Deficient') {
      rating = 1;
    } else if (reviewerRating === '2 - Improvements Required') {
      rating = 2;
    } else if (reviewerRating === '3 - Meets Expectations') {
      rating = 3;
    } else if (reviewerRating === '4 - Above Expectations') {
      rating = 4;
    } else if (reviewerRating === '5 - Excellent') {
      rating = 5;
    }
    return rating * weightage;
  }
}
