import { IndicatorQueryParams } from './indicator-query-params.model';

export interface BasetempIndicatorQueryParams extends IndicatorQueryParams {
  basetemp: Number;
  basetemp_units: string;
}
