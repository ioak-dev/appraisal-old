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
export class FeedbackService {

  constructor(private http: HttpClient) {
  }

  getProviders(cycleId, receiverId): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/receiver/' + receiverId;
    return this.http.get(url).pipe(map(response => response));
  }

  getReceivers(cycleId, providerId): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/provider/' + providerId;
    return this.http.get(url).pipe(map(response => response));
  }

  getCycle(cycleId): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId;
    return this.http.get(url).pipe(map(response => response));
  }

  getCyclesByReceiver(receiverId): Observable<any> {
    const url = environment.baseUrl + '/feedback/receiver/' + receiverId;
    return this.http.get(url).pipe(map(response => response));
  }

  saveProviders(jsonObj, cycleId: string): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/updateProviders';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }

  saveFeedback(jsonObj, cycleId: string): Observable<any> {
    const url = environment.baseUrl + '/feedback/cycle/' + cycleId + '/saveResponse';
    return this.http.put<any>(url, jsonObj, httpOptions);
  }
}
