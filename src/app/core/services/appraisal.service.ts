import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AppraisalService {

  constructor(private http: HttpClient) {
  }

  getAppraisal(cycleId, userId): Observable<any> {
    return this.http.get(environment.baseUrl + '/appraisal/cycle/' + cycleId + '/manageable/' + userId).pipe(map(response => response));
  }
  getAppraisalbyAppraisalId(appraisalId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId;
    return this.http.get(url).pipe(map(response => response));
  }
  getAppraisalbyUserId(cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId;
    return this.http.get(url).pipe(map(response => response));
  }
  getSectiononebyUserId(cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionone';
    return this.http.get(url).pipe(map(response => response));
  }
  getSectiontwobyUserId(section, cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/' + section;
    return this.http.get(url).pipe(map(response => response));
  }
  getSectionfourbyUserId(cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionfour';
    return this.http.get(url).pipe(map(response => response));
  }
  getSectionfivebyUserId(cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionfive';
    return this.http.get(url).pipe(map(response => response));
  }
  submitSelfGoals(appraisalId: string): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/submitSelfGoals';
    return this.http.post<any>(url, httpOptions);
  }
  submitFeedback(appraisalId: string): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/submitSelfAppraisal';
    return this.http.post<any>(url, httpOptions);
  }
  submitReviewerFeedback(appraisalId: string): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/submitReviewerAppraisal';
    return this.http.post<any>(url, httpOptions);
  }
  submitSectionOneReviewerFeedback(appraisalId, reviewerId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/sectionone/reviewer/' + reviewerId + '/submit';
    return this.http.post<any>(url, httpOptions);
  }
  completeAppraisal(appraisalId: string): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/completeAppraisal';
    return this.http.post<any>(url, httpOptions);
  }
  errorCheck(appraisalId: string): Observable<any> {
    const url = environment.baseUrl + '/appraisal/' + appraisalId + '/errorCheck';
    return this.http.post<any>(url, httpOptions);
  }
  saveFeedback(jsonObj): Observable<any> {
    const url = environment.baseUrl + '/appraisal/saveResponse';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
  notifyAppraisal(cycleId: string, result: any): Observable<any> {
    const url = environment.baseUrl + '/notification/' + cycleId + '/send';
    return this.http.post<any>(url, result, httpOptions);
  }
  notifyUser(result: any): Observable<any> {
    const url = environment.baseUrl + '/notification/send';
    return this.http.post<any>(url, result, httpOptions);
  }
  saveSectionOneFeedback(jsonObj, cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionone';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
  saveSectionOneReviewerFeedback(jsonObj, cycleId, userId, reviewerId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionone/reviewer/' + reviewerId;
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
  saveSectionFourFeedback(jsonObj, cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionfour';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
  saveSectionFiveFeedback(jsonObj, cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/sectionfive';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
  saveSectionTwoFeedback(section, jsonObj, cycleId, userId): Observable<any> {
    const url = environment.baseUrl + '/appraisal/cycle/' + cycleId + '/user/' + userId + '/' + section;
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
}
