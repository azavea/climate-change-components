import { MultiDataPoint } from './multi-data-point.model';
import { Indicator } from './indicator.model';
import { City } from './city.model';
import { ClimateModel } from './climate-model.model';
import { Scenario } from './scenario.model';
import { TimeAggParam } from './time-agg-param.enum';

/* tslint:disable:variable-name */
export class ChartData {
  indicator: Indicator;
  data: MultiDataPoint[];
  time_aggregation: TimeAggParam;
  time_format: string;
  city?: City;
  climate_models?: ClimateModel[];
  scenario?: Scenario;
  units?: string;
}
/* tslint:enable:variable-name */
