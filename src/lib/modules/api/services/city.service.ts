import { Inject, Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { City } from '../models/city.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';

/*
 * City Service
 * Returns cities from API
 */
@Injectable()
export class CityService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp) {}

  public list(page?: Number, pageSize?: Number): Observable<City[]> {
    const url = this.apiHost + '/api/city/';

    const searchParams: URLSearchParams = new URLSearchParams();
    if (page) {
      searchParams.append('page', page.toString());
    }
    if (pageSize) {
      searchParams.append('pageSize', pageSize.toString());
    }

    const requestOptions = new RequestOptions({ search: searchParams });
    return this.apiHttp.get(url, requestOptions)
        .map(resp => resp.json().features || [] as City[]);
  }

  public search(text: string): Observable<City[]> {
    const url = this.apiHost + '/api/city/';
    const searchParams: URLSearchParams = new URLSearchParams();
    searchParams.append('search', text);
    const requestOptions = new RequestOptions({ search: searchParams });
    return this.apiHttp.get(url, requestOptions)
        .map(response => response.json().features || [] as City[]);
  }

}
