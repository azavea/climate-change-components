import { InjectionToken } from '@angular/core';
import { Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs';


export let API_HOST = new InjectionToken<string>('climate-change-components-api-host');

export let API_HTTP = new InjectionToken<ApiHttp>('climate-change-components-api-http');

export class ApiConfig {
  apiHost: string;
  apiHttpInjectionToken: any;
}

export interface ApiHttp {

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;

    get(url: string, options?: RequestOptionsArgs): Observable<Response>;

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;

    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
}
