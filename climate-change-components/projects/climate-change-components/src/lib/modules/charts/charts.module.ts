import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  BsDropdownModule,
  ModalModule,
  TooltipModule
} from 'ngx-bootstrap';

import { DatasetToggleComponent } from './components/dataset-toggle/dataset-toggle.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { ModelModalComponent } from './components/model-modal/model-modal.component';
import { ScenarioToggleComponent } from './components/scenario-toggle/scenario-toggle.component';
import { UnitsDropdownComponent } from './components/units-dropdown/units-dropdown.component';
import {
  BasetempComponent,
  HistoricComponent,
  PercentileComponent,
  PercentileHistoricComponent,
  ThresholdComponent
} from './components/extra-params';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [
    BasetempComponent,
    DatasetToggleComponent,
    HistoricComponent,
    LineGraphComponent,
    ModelModalComponent,
    PercentileComponent,
    PercentileHistoricComponent,
    ScenarioToggleComponent,
    ThresholdComponent,
    UnitsDropdownComponent
  ],
  exports: [
    BasetempComponent,
    DatasetToggleComponent,
    HistoricComponent,
    LineGraphComponent,
    ModelModalComponent,
    PercentileComponent,
    PercentileHistoricComponent,
    ScenarioToggleComponent,
    ThresholdComponent,
    UnitsDropdownComponent
  ]
})
export class ChartsModule {}
