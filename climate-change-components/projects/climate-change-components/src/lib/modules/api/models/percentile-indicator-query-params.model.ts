import {
  IndicatorQueryParams,
  IndicatorDistanceQueryParams,
} from './indicator-query-params.model';

export interface PercentileIndicatorQueryParams extends IndicatorQueryParams {
  percentile: number;
}

export interface PercentileIndicatorDistanceQueryParams
  extends IndicatorDistanceQueryParams, PercentileIndicatorQueryParams { }
