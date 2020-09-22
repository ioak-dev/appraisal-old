import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { RatingScaleType } from '../model/rating-scale-type';

@Injectable({
  providedIn: 'root'
})
export class RatingScaleService {

  constructor(private http: HttpClient) {
  }

  getDefinitions(): any {
    return this.http.get<Array<RatingScaleType>>(
      environment.baseUrl + '/ratingScale'
    );
  }
}
