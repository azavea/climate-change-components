import {
  IndicatorQueryParams,
  IndicatorDistanceQueryParams,
} from './indicator-query-params.model';
import { HistoricPercentileParam } from './historic-percentile-param.enum';

export interface PercentileHistoricIndicatorQueryParams extends IndicatorQueryParams {
  historic_range: number;
  percentile: HistoricPercentileParam;
}

export interface PercentileHistoricIndicatorDistanceQueryParams
  extends IndicatorDistanceQueryParams, PercentileHistoricIndicatorQueryParams { }
