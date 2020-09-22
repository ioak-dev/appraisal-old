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
export class ProvideFeedbackService {

  constructor(private http: HttpClient) {
  }


  submitFeedback(jsonObj, cycleId: string ): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/submitResponse';
    return this.http.post<any>(url , jsonObj, httpOptions);
  }
}
