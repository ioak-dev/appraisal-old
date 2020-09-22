import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class ReviewResponseService {

  constructor(private http: HttpClient) {
  }

  approve(cycleId: string, jsonObj): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId  + '/approveFeedback';
    return this.http.post<any>(url, jsonObj, httpOptions);
  }

  reject(cycleId: string , jsonObj): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/rejectFeedback' ;
    return this.http.post<any>(url , jsonObj, httpOptions);
  }
}
