import { City } from './city.model';
import { Indicator } from './indicator.model';
import { IndicatorQueryParams } from './indicator-query-params.model';
import { ClimateModel } from './climate-model.model';
import { Scenario } from './scenario.model';

export interface IndicatorRequestOpts {
  indicator: Indicator;
  city: City;
  scenario: Scenario;
  params: IndicatorQueryParams;
}
