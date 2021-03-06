import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { HistoricRange } from '../models/historic-range.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';
import { APICacheService } from './api-cache.service';

/*
 * Historic Range Service
 * Returns available historic ranges from API
 */
@Injectable()
export class HistoricRangeService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp,
              private cache: APICacheService) {}

  public list(): Observable<HistoricRange[]> {
    const url = this.apiHost + '/api/historic-range/';
    const request = this.apiHttp.get(url);
    const response = this.cache.get('climate.api.historicrange.list', request);
    return response.map(resp => resp.json() || [] as HistoricRange[]);
  }
}
