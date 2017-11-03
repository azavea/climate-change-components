import { IndicatorQueryParams } from './indicator-query-params.model';

export interface PercentileHistoricIndicatorQueryParams extends IndicatorQueryParams {
  historic_range: Number;
  percentile: Number;
}
