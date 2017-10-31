import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatasetToggleComponent } from './components/dataset-toggle/dataset-toggle.component';
import { LineGraphComponent } from './components/line-graph/line-graph.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DatasetToggleComponent,
    LineGraphComponent
  ],
  exports: [
    DatasetToggleComponent,
    LineGraphComponent
  ]
})
export class ChartsModule {}
