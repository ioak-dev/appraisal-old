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
export class UserAdministrationService {

  constructor(private http: HttpClient) {
  }

  updateRoles(userId: string, roles: any[]): Observable<any> {
    const url = environment.baseUrl + '/person/' + userId + '/updateRoles' ;
    return this.http.put<any>(url , roles, httpOptions);
  }
}
