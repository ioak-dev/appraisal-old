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
export class CycleService {

  constructor(private http: HttpClient) {
  }

  getCyclebyId(cycleId): Observable<any> {
    return this.http.get(environment.baseUrl + '/cycle/' + cycleId).pipe(map(response => response));
  }

  getCycles(): Observable<any> {
    return this.http.get(environment.baseUrl + '/cycle').pipe(map(response => response));
  }

  createCycle(result): Observable<any> {
    const url = environment.baseUrl + '/cycle';
    return this.http.post<any>(url, result, httpOptions);
  }

  deleteCycle(cycleId: string): Observable<any> {
    const url = environment.baseUrl + '/cycle/' + cycleId;
    return this.http.delete<any>(url, httpOptions);
  }
}
