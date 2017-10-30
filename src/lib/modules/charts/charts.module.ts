import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineGraphComponent } from './components/line-graph.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LineGraphComponent
  ],
  exports: [
    LineGraphComponent
  ]
})
export class ChartsModule {}
