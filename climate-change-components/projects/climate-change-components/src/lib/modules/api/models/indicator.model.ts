import { IndicatorParameter } from './indicator-parameter.model';

/* tslint:disable:variable-name */
export class Indicator {
  name: string;
  label: string;
  description: string;
  time_aggregation: string;
  variables: string[];
  available_units?: string[];
  default_units?: string;
  parameters?: IndicatorParameter[];
  valid_aggregations?: string[];
}
/* tslint:enable:variable-name */
