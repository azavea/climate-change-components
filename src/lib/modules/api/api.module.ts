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
