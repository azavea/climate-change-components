import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  ModalModule
} from 'ngx-bootstrap';

import { DatasetToggleComponent } from './components/dataset-toggle/dataset-toggle.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';
import { ModelModalComponent } from './components/model-modal/model-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ModalModule.forRoot()
  ],
  declarations: [
    DatasetToggleComponent,
    LineGraphComponent,
    ModelModalComponent
  ],
  exports: [
    DatasetToggleComponent,
    LineGraphComponent,
    ModelModalComponent
  ]
})
export class ChartsModule {}
