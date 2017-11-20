import { IndicatorQueryParams } from './indicator-query-params.model';
import { HistoricPercentileParam } from './historic-percentile-param.enum';

export interface PercentileHistoricIndicatorQueryParams extends IndicatorQueryParams {
  historic_range: Number;
  percentile: HistoricPercentileParam;
}
