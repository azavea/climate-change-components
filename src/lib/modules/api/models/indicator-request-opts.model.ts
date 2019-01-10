import { Indicator } from './indicator.model';
import {
  IndicatorDistanceQueryParams,
  IndicatorQueryParams,
} from './indicator-query-params.model';
import { Scenario } from './scenario.model';

export interface IndicatorRequestOpts {
  indicator: Indicator;
  scenario: Scenario;
  params: IndicatorQueryParams;
}

export interface IndicatorDistanceRequestOpts {
  indicator: Indicator;
  scenario: Scenario;
  params: IndicatorDistanceQueryParams;
}
