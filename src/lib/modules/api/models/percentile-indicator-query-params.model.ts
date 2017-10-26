import { IndicatorQueryParams } from './indicator-query-params.model';

export interface PercentileIndicatorQueryParams extends IndicatorQueryParams {
  percentile: Number;
}
