import { Observable } from 'rxjs/Rx';

export interface ApiHttp {

    get(url: string, options?: any): Observable<any>;

    post(url: string, body: any, options?: any): Observable<any>;

    put(url: string, body: any, options?: any): Observable<any>;

    delete(url: string, options?: any): Observable<any>;
}
