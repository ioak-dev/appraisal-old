import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  MatInputModule,
  MatMenuModule,
  MatButtonModule,
  MatIconModule,
  MatTabsModule,
  MatChipsModule,
  MatSelectModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatRadioModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import {MatSidenavModule, MatAutocompleteModule, MatSnackBarModule} from '@angular/material';
import {MatToolbarModule, MatListModule, MatTooltipModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';

import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './core/components/navigation-bar/navigation-bar.component';
import { HomeComponent } from './home/home.component';
import { ProvideFeedbackComponent } from './provide-feedback/provide-feedback.component';
import { LoginComponent } from './login/login.component';
import { UserSearchBarComponent } from './core/components/user-search-bar/user-search-bar.component';
import { ReviewResponseComponent } from './review-response/review-response.component';
import { ViewResponseComponent } from './view-response/view-response.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { TextInputDialogComponent } from './core/components/text-input-dialog/text-input-dialog.component';
import { UserAdministrationComponent } from './user-administration/user-administration.component';
import { UserAdministrationDialogComponent } from './user-administration-dialog/user-administration-dialog.component';
import { SelfAppraisalComponent } from './self-appraisal/self-appraisal.component';
import { ManageAppraisalComponent } from './manage-appraisal/manage-appraisal.component';
import { SelfAppraisalSectiononeComponent } from './self-appraisal-sectionone/self-appraisal-sectionone.component';
import { SelfAppraisalSectiontwoComponent } from './self-appraisal-sectiontwo/self-appraisal-sectiontwo.component';
import { ManageAppraisalDialogComponent } from './manage-appraisal-dialog/manage-appraisal-dialog.component';
import { GoalDefinitionComponent } from './goal-definition/goal-definition.component';
import { RatingScaleComponent } from './rating-scale/rating-scale.component';
import { NotifyDialogComponent } from './notify-dialog/notify-dialog.component';
import { SelfAppraisalSectionfourComponent } from './self-appraisal-sectionfour/self-appraisal-sectionfour.component';
import { SubmitErrorDialogComponent } from './submit-error-dialog/submit-error-dialog.component';
import { SubmitConfirmationDialogComponent } from './submit-confirmation-dialog/submit-confirmation-dialog.component';
import {SelfAppraisalSectionfiveComponent} from './self-appraisal-sectionfive/self-appraisal-sectionfive.component';
import { HelpComponent } from './help/help.component';
import { SetGoalsComponent } from './set-goals/set-goals.component';
import { SetGoalsDialogComponent } from './set-goals-dialog/set-goals-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    HomeComponent,
    ProvideFeedbackComponent,
    LoginComponent,
    UserSearchBarComponent,
    ReviewResponseComponent,
    ViewResponseComponent,
    UnauthorizedComponent,
    TextInputDialogComponent,
    UserAdministrationComponent,
    UserAdministrationDialogComponent,
    SelfAppraisalComponent,
    ManageAppraisalComponent,
    SelfAppraisalSectiononeComponent,
    SelfAppraisalSectiontwoComponent,
    ManageAppraisalDialogComponent,
    GoalDefinitionComponent,
    RatingScaleComponent,
    NotifyDialogComponent,
    SelfAppraisalSectionfourComponent,
    SelfAppraisalSectionfiveComponent,
    SubmitErrorDialogComponent,
    SubmitConfirmationDialogComponent,
    HelpComponent,
    SetGoalsComponent,
    SetGoalsDialogComponent
  ],
  imports: [
    MatToolbarModule,
    MatListModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTabsModule,
    MatSidenavModule,
    MatCardModule,
    MatDialogModule,
    MatGridListModule,
    FlexLayoutModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatChipsModule,
    MatSelectModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [
    TextInputDialogComponent,
    UserAdministrationDialogComponent,
    ManageAppraisalDialogComponent,
    NotifyDialogComponent,
    SubmitErrorDialogComponent,
    SubmitConfirmationDialogComponent,
    SetGoalsDialogComponent
  ]
})
export class AppModule { }
