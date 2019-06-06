import { HttpParams, HttpResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Point } from 'geojson';
import { of as observableOf, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { City } from '../models/city.model';
import { Indicator } from '../models/indicator.model';
import {
  IndicatorQueryParams,
  IndicatorDistanceQueryParams,
} from '../models/indicator-query-params.model';
import {
  IndicatorRequestOpts,
  IndicatorDistanceRequestOpts,
} from '../models/indicator-request-opts.model';
import { ThresholdIndicatorQueryParams } from '../models/threshold-indicator-query-params.model';
import { BasetempIndicatorQueryParams } from '../models/basetemp-indicator-query-params.model';
import { HistoricIndicatorQueryParams } from '../models/historic-indicator-query-params.model';
import { PercentileIndicatorQueryParams } from '../models/percentile-indicator-query-params.model';
import { PercentileHistoricIndicatorQueryParams } from '../models/percentile-historic-indicator-query-params.model';

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

  public getData(city: City, options: IndicatorRequestOpts) {
    const url = `${this.apiHost}/api/climate-data/${city.id}/${options.scenario.name}` +
                `/indicator/${options.indicator.name}/`;
    return this.makeDataRequest(url, options);
  }

  public getDataForLatLon(point: Point, options: IndicatorDistanceRequestOpts) {
    const url = `${this.apiHost}/api/climate-data/${point.coordinates[1]}/${point.coordinates[0]}/` +
                `${options.scenario.name}/indicator/${options.indicator.name}/`;
    return this.makeDataRequest(url, options);
  }

  public list(): Observable<Indicator[]> {
    const url = this.apiHost + '/api/indicator/';
    const request = this.apiHttp.get(url);
    const response = this.cache.get('climate.api.indicator.list', request);
    return response.pipe(map(resp => (resp || []) as Indicator[]));
  }

  private makeDataRequest(url: string, options: IndicatorRequestOpts) {
    const searchParams = this.requestOptsToSearchParams(options);
    if (!searchParams) {
      return observableOf({url: ''});
    }
    return this.apiHttp.get(url, { params: { search: searchParams } }).pipe(map((resp: HttpResponse<any>) => {
      // Append the queried URL to the JSON representation of the response body.
      const result = resp.body;
      result.url = resp.url;
      return result;
    }));
  }

  private requestOptsToSearchParams(options: IndicatorRequestOpts): HttpParams {
    // Generate query params
    let searchParams: HttpParams = new HttpParams();

    // append extra parameters, if needed
    if (isThresholdIndicator(options.indicator.name)) {
      const thresholdParams = options.params as ThresholdIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!thresholdParams.threshold) {
        return undefined;
      }
      searchParams = searchParams.append('threshold', thresholdParams.threshold.toString());
      searchParams = searchParams.append('threshold_units', thresholdParams.threshold_units);
      searchParams = searchParams.append('threshold_comparator', thresholdParams.threshold_comparator);
    } else if (isBasetempIndicator(options.indicator.name)) {
      const basetempOpts = options.params as BasetempIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!basetempOpts.basetemp) {
        return undefined;
      }
      searchParams = searchParams.append('basetemp', basetempOpts.basetemp.toString());
      searchParams = searchParams.append('basetemp_units', basetempOpts.basetemp_units);
    } else if (isHistoricIndicator(options.indicator.name) &&
               isPercentileIndicator(options.indicator.name)) {
      const percentileHistoricOpts = options.params as PercentileHistoricIndicatorQueryParams;
      if (percentileHistoricOpts.historic_range) {
        searchParams = searchParams.append('historic_range', percentileHistoricOpts.historic_range.toString());
      }
      // abort request if chart is in flux (these parameters are required)
      if (!percentileHistoricOpts.percentile) {
        return undefined;
      }
      searchParams = searchParams.append('percentile', percentileHistoricOpts.percentile.toString());
    } else if (isHistoricIndicator(options.indicator.name)) {
      const historicOpts = options.params as HistoricIndicatorQueryParams;
      if (historicOpts.historic_range) {
        searchParams = searchParams.append('historic_range', historicOpts.historic_range.toString());
      }
    } else if (isPercentileIndicator(options.indicator.name)) {
      const percentileOpts = options.params as PercentileIndicatorQueryParams;
      // abort request if chart is in flux (these parameters are required)
      if (!percentileOpts.percentile) {
        return undefined;
      }
      searchParams = searchParams.append('percentile', percentileOpts.percentile.toString());
    }

    if (this.hasDistanceParam(options.params)) {
      const distanceParams = options.params as IndicatorDistanceQueryParams;
      searchParams = searchParams.append('distance', distanceParams.distance.toString());
    }

    if (options.params.years) {
      searchParams = searchParams.append('years', options.params.years.join(','));
    }
    if (options.params.climateModels && options.params.climateModels.length) {
      searchParams = searchParams.append('models', options.params.climateModels.map(m => m.name).join(','));
    }
    if (options.params.time_aggregation) {
      searchParams = searchParams.append('time_aggregation', options.params.time_aggregation);
    }
    if (options.params.unit) {
      searchParams = searchParams.append('units', options.params.unit);
    }
    if (options.params.dataset) {
      searchParams = searchParams.append('dataset', options.params.dataset);
    }

    return searchParams;
  }

  private hasDistanceParam(params: IndicatorQueryParams): params is IndicatorDistanceQueryParams {
    return (params as IndicatorDistanceQueryParams).distance !== undefined;
  }
}
