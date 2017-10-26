import { IndicatorQueryParams } from './indicator-query-params.model';

export interface HistoricIndicatorQueryParams extends IndicatorQueryParams {
  historic_range: Number;
}
