import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GoalDefinitionType} from '../model/goal-definition-type';

@Injectable({
  providedIn: 'root'
})
export class GoalDefinitionService {

  constructor(private http: HttpClient) {
  }

  getDefinitions(userId: String): any {
    return this.http.get<Array<GoalDefinitionType>>(
      environment.baseUrl + '/goalDefinition/' + userId
    );
  }
}
