import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ClimateModel } from '../models/climate-model.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';

/*
 * Climate Model Service
 * Returns climate models from API
 */
@Injectable()
export class ClimateModelService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp) {}

  public list(): Observable<ClimateModel[]> {
    const url = this.apiHost + '/api/climate-model/';
    return this.apiHttp.get(url).map(resp => resp.json() || [] as ClimateModel[]);
  }
}

