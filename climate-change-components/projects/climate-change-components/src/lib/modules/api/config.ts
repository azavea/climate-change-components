import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiHttp } from './services/api-http.interface';


export let API_HOST = new InjectionToken<string>('climate-change-components-api-host');

export let API_HTTP = new InjectionToken<ApiHttp>('climate-change-components-api-http');

export class ApiConfig {
  apiHost: string;
  apiHttpInjectionToken: any;
}

export { ApiHttp } from './services/api-http.interface';
