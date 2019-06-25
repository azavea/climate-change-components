import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Dataset } from '../models/dataset.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';
import { APICacheService } from './api-cache.service';

/*
 * Dataset Service
 * Returns datasets from API
 */
@Injectable({providedIn: 'root'})
export class DatasetService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp,
              private cache: APICacheService) {}

  public list(): Observable<Dataset[]> {
    const url = this.apiHost + '/api/dataset/';
    const request = this.apiHttp.get(url);
    return this.cache.get('climate.api.dataset.list', request);
  }
}
