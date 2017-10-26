import { Request, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

export interface ApiHttp {

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response>;

    get(url: string, options?: RequestOptionsArgs): Observable<Response>;

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response>;

    delete(url: string, options?: RequestOptionsArgs): Observable<Response>;
}
