import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Scenario } from '../models/scenario.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';

/*
 * Scenario Service
 * Returns scenarios from API
 */
@Injectable()
export class ScenarioService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp) {}

  public list(): Observable<Scenario[]> {
    const url = this.apiHost + '/api/scenario/';
    return this.apiHttp.get(url).map(resp => resp.json() || [] as Scenario[]);
  }
}
