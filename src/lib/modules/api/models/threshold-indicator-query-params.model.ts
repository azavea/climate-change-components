import { IndicatorQueryParams } from './indicator-query-params.model';

export interface ThresholdIndicatorQueryParams extends IndicatorQueryParams {
  threshold: Number;
  threshold_units: string;
  threshold_comparator: string;
}
