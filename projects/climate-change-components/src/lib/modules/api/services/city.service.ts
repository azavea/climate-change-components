import { Inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { City } from '../models/city.model';
import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';

/*
 * City Service
 * Returns cities from API
 */
@Injectable({providedIn: 'root'})
export class CityService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp) {}

  public list(page?: number, pageSize?: number): Observable<City[]> {
    const url = this.apiHost + '/api/city/';

    const searchParams: HttpParams = new HttpParams();
    if (page) {
      searchParams.append('page', page.toString());
    }
    if (pageSize) {
      searchParams.append('pageSize', pageSize.toString());
    }

    return this.apiHttp.get(url, { params: { search: searchParams } })
        .pipe(map(resp => resp.features || [] as City[]));
  }

  public search(text: string): Observable<City[]> {
    const url = this.apiHost + '/api/city/';
    const searchParams: HttpParams = new HttpParams();
    searchParams.append('search', text);
    return this.apiHttp.get(url, { params: { search: searchParams } })
        .pipe(map(response => response.features || [] as City[]));
  }

}
