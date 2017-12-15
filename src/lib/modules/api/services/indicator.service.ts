import { Inject, Injectable } from '@angular/core';
import { RequestOptions, URLSearchParams } from '@angular/http';
import { Observable, Observer } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

import { Indicator } from '../models/indicator.model';
import { IndicatorRequestOpts } from '../models/indicator-request-opts.model';
import { ThresholdIndicatorQueryParams } from '../models/threshold-indicator-query-params.model';
import { BasetempIndicatorQueryParams } from '../models/basetemp-indicator-query-params.model';
import { HistoricIndicatorQueryParams } from '../models/historic-indicator-query-params.model';
import { PercentileIndicatorQueryParams } from '../models/percentile-indicator-query-params.model';
import { PercentileHistoricIndicatorQueryParams } from '../models/percentile-historic-indicator-query-params.model';
import { IndicatorQueryParams } from '../models/indicator-query-params.model';

import { isBasetempIndicator,
         isHistoricIndicator,
         isPercentileIndicator,
         isThresholdIndicator } from '../../shared/extra-params.constants';

import { ApiHttp } from './api-http.interface';
import { API_HOST, API_HTTP } from '../config';
import { APICacheService } from './api-cache.service';


/*
 * Indicator Service
 * Returns climate indicators. Used by the sidebar and to retrieve detail data for charts.
 */
@Injectable()
export class IndicatorService {

  constructor(@Inject(API_HOST) private apiHost: string,
              @Inject(API_HTTP) private apiHttp: ApiHttp,
              private cache: APICacheService) {}

  public getData(options: IndicatorRequestOpts) {

    const url = `${this.apiHost}/api/climate-data/${options.city.id}/${options.scenario.name}` +
                `/indicator/${options.indicator.name}/`;

    // Generate query params
    const searchParams: URLSearchParams = new URLSearchParams();

    // append extra parameters, if needed
    if (isThresholdIndicator(options.indicator.name)) {
      const thresholdParams = options.params as ThresholdIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!thresholdParams.threshold) {
        return Observable.of({url: ''});
      }
      searchParams.append('threshold', thresholdParams.threshold.toString());
      searchParams.append('threshold_units', thresholdParams.threshold_units);
      searchParams.append('threshold_comparator', thresholdParams.threshold_comparator);
    } else if (isBasetempIndicator(options.indicator.name)) {
      const basetempOpts = options.params as BasetempIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!basetempOpts.basetemp) {
        return Observable.of({url: ''});
      }
      searchParams.append('basetemp', basetempOpts.basetemp.toString());
      searchParams.append('basetemp_units', basetempOpts.basetemp_units);
    } else if (isHistoricIndicator(options.indicator.name) &&
               isPercentileIndicator(options.indicator.name)) {
      const percentileHistoricOpts = options.params as PercentileHistoricIndicatorQueryParams;
      if (percentileHistoricOpts.historic_range) {
        searchParams.append('historic_range', percentileHistoricOpts.historic_range.toString());
      }
      // abort request if chart is in flux (these parameters are required)
      if (!percentileHistoricOpts.percentile) {
        return Observable.of({url: ''});
      }
      searchParams.append('percentile', percentileHistoricOpts.percentile.toString());
    } else if (isHistoricIndicator(options.indicator.name)) {
      const historicOpts = options.params as HistoricIndicatorQueryParams;
      if (historicOpts.historic_range) {
        searchParams.append('historic_range', historicOpts.historic_range.toString());
      }
    } else if (isPercentileIndicator(options.indicator.name)) {
      const percentileOpts = options.params as PercentileIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!percentileOpts.percentile) {
        return Observable.of({url: ''});
      }
      searchParams.append('percentile', percentileOpts.percentile.toString());
    }

    if (options.params.years) {
      searchParams.append('years', options.params.years.join(','));
    }
    if (options.params.climateModels) {
      searchParams.append('models', options.params.climateModels.map(m => m.name).join(','));
    }
    if (options.params.time_aggregation) {
      searchParams.append('time_aggregation', options.params.time_aggregation);
    }
    if (options.params.unit) {
      searchParams.append('units', options.params.unit);
    }
    if (options.params.dataset) {
      searchParams.append('dataset', options.params.dataset);
    }

    const requestOptions = new RequestOptions({ search: searchParams });
    return this.apiHttp.get(url, requestOptions).map(resp => {
      const result = resp.json();
      // Append the queried URL to the JSON representation of the response body.
      // Discusson of what undocumented `Response` method `json` does, exactly:
      // https://stackoverflow.com/a/41309889
      result.url = resp.url;
      return result;
    });
  }

  public list(): Observable<Indicator[]> {
    const url = this.apiHost + '/api/indicator/';
    const request = this.apiHttp.get(url);
    const response = this.cache.get('climate.api.indicator.list', request);
    return response.map(resp => (resp.json() || []) as Indicator[]);
  }
}
