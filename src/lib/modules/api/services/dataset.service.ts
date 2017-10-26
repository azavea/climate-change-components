import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { Dataset } from '../models/dataset.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';

/*
 * Dataset Service
 * Returns datasets from API
 */
@Injectable()
export class DatasetService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp) {}

  public list(): Observable<Dataset[]> {
    const url = this.apiHost + '/api/dataset/';
    return this.apiHttp.get(url).map(resp => resp.json() || [] as Dataset[]);
  }
}
