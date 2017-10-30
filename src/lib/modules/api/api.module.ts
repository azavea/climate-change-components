import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { API_HOST, API_HTTP, ApiConfig } from './config';

import { ChartService } from './services/chart.service';
import { DatasetService } from './services/dataset.service';
import { ClimateModelService } from './services/climate-model.service';
import { HistoricRangeService } from './services/historic-range.service';
import { IndicatorService } from './services/indicator.service';
import { ScenarioService } from './services/scenario.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})
export class ApiModule {
  static forRoot(config: ApiConfig): ModuleWithProviders {
    return {
      ngModule: ApiModule,
      providers: [
        ChartService,
        DatasetService,
        ClimateModelService,
        HistoricRangeService,
        IndicatorService,
        ScenarioService,
        {provide: API_HOST, useValue: config.apiHost},
        {provide: API_HTTP, useExisting: config.apiHttpInjectionToken},
      ]
    };
  }
}

export { BasetempIndicatorQueryParams } from './models/basetemp-indicator-query-params.model';
export * from './models/chart-data.model';
export * from './models/chart.model';
export { City } from './models/city.model';
export * from './models/climate-model.model';
export * from './models/data-point.model';
export { Dataset } from './models/dataset.model';
export { HistoricIndicatorQueryParams } from './models/historic-indicator-query-params.model';
export * from './models/historic-range.model';
export * from './models/indicator-parameter.model';
export { IndicatorQueryParams } from './models/indicator-query-params.model';
export * from './models/indicator-request-opts.model';
export * from './models/indicator.model';
export * from './models/multi-data-point.model';
export { PercentileIndicatorQueryParams } from './models/percentile-indicator-query-params.model';
export { Scenario } from './models/scenario.model';
export { ThresholdIndicatorQueryParams } from './models/threshold-indicator-query-params.model';
export * from './models/time-agg-param.enum';

export { ApiHttp } from './services/api-http.interface';

export * from './services/chart.service';
export * from './services/city.service';
export * from './services/climate-model.service';
export * from './services/dataset.service';
export * from './services/historic-range.service';
export * from './services/indicator.service';
export * from './services/scenario.service';
