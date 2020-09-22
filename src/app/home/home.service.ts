import {CycleType} from '../model/cycle-type';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private http: HttpClient) {
  }

  getCycles(): any {
    return this.http.get<Array<CycleType>>(
      environment.baseUrl + '/cycle'
    );
  }
  getStatus(): any {
    return this.http.get(
      environment.baseUrl + '/appraisal/getStatusCount'
    );
  }
}
