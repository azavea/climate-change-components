import { Indicator } from './indicator.model';
import { IndicatorQueryParams } from './indicator-query-params.model';
import { Scenario } from './scenario.model';

export interface IndicatorRequestOpts {
  indicator: Indicator;
  scenario: Scenario;
  params: IndicatorQueryParams;
}
