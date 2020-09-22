import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {HelpComponent} from './help/help.component';
import {ProvideFeedbackComponent} from './provide-feedback/provide-feedback.component';
import {ReviewResponseComponent} from './review-response/review-response.component';
import {ViewResponseComponent} from './view-response/view-response.component';
import {UnauthorizedComponent} from './unauthorized/unauthorized.component';
import {UserAdministrationComponent} from './user-administration/user-administration.component';
import {SelfAppraisalComponent} from './self-appraisal/self-appraisal.component';
import {ManageAppraisalComponent} from './manage-appraisal/manage-appraisal.component';
import {GoalDefinitionComponent} from './goal-definition/goal-definition.component';
import {AuthGuard} from './auth.guard';
import { RatingScaleComponent } from './rating-scale/rating-scale.component';
import { SetGoalsComponent } from './set-goals/set-goals.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent},
  { path: '', component: LoginComponent},
  { path: 'help', component: HelpComponent},
  { path: 'provide-feedback', component: ProvideFeedbackComponent, canActivate: [AuthGuard]},
  { path: 'review-response', component: ReviewResponseComponent, canActivate: [AuthGuard]},
  { path: 'view-response', component: ViewResponseComponent, canActivate: [AuthGuard]},
  { path: 'user-administration', component: UserAdministrationComponent, canActivate: [AuthGuard]},
  { path: 'self-appraisal', component: SelfAppraisalComponent, canActivate: [AuthGuard]},
  { path: 'manage-appraisal', component: ManageAppraisalComponent, canActivate: [AuthGuard]},
  { path: 'goal-definition', component: GoalDefinitionComponent, canActivate: [AuthGuard]},
  { path: 'rating-scale', component: RatingScaleComponent, canActivate: [AuthGuard]},
  { path: 'unauthorized', component: UnauthorizedComponent, canActivate: [AuthGuard]},
  { path: 'set-goals', component: SetGoalsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
