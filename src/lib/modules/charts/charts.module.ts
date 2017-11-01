import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  BsDropdownModule,
  ModalModule
} from 'ngx-bootstrap';

import { DatasetToggleComponent } from './components/dataset-toggle/dataset-toggle.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { ModelModalComponent } from './components/model-modal/model-modal.component';
import { ScenarioToggleComponent } from './components/scenario-toggle/scenario-toggle.component';
import { UnitsDropdownComponent } from './components/units-dropdown/units-dropdown.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    DatasetToggleComponent,
    LineGraphComponent,
    ModelModalComponent,
    ScenarioToggleComponent,
    UnitsDropdownComponent
  ],
  exports: [
    DatasetToggleComponent,
    LineGraphComponent,
    ModelModalComponent,
    ScenarioToggleComponent,
    UnitsDropdownComponent
  ]
})
export class ChartsModule {}
