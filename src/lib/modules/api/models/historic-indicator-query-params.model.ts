import {
  IndicatorQueryParams,
  IndicatorDistanceQueryParams,
} from './indicator-query-params.model';

export interface HistoricIndicatorQueryParams extends IndicatorQueryParams {
  historic_range: Number;
}

export interface HistoricIndicatorDistanceQueryParams
  extends IndicatorDistanceQueryParams, HistoricIndicatorQueryParams { }
