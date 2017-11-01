import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { ClimateModel } from '../../../api/models/climate-model.model';
import { ClimateModelService } from '../../../api/services/climate-model.service';
import { Dataset } from '../../../api/models/dataset.model';

/*  Model Modal Component
    -- Requires input for selected dataset and models
    -- Emits selected model
    Expected use:
        <ccc-model-modal
            [dataset]="yourDataset"
            [models]="yourSelectedModels"
            (onModelsChanged)="modelsChanged($event)">
*/

@Component({
  selector: 'ccc-model-modal',
  templateUrl: './model-modal.component.html'
})
export class ModelModalComponent implements OnInit {

    @Input() dataset: Dataset;
    @Input() models: ClimateModel[];
    @Output() onModelsChanged = new EventEmitter<ClimateModel[]>();

    public buttonText: string;
    public climateModels: ClimateModel[] = [];
    public smModal: any;

    constructor(private climateModelService: ClimateModelService) {}

    ngOnInit() {
        this.getClimateModels();
    }

    // unselect all model checkboxes when option to use all models selected
    public clearClimateModels() {
        this.climateModels.forEach(model => model.selected = false);
    }

    // disable models not valid for the project datset
    public disableClimateModels() {
        if (!this.dataset) {
            return;
        }
        this.climateModels.forEach(model => {
            model.enabled = this.dataset.models.indexOf(model.name) >= 0;
        });
    }

    public isModalUpdateButtonDisabled() {
        return this.climateModels.filter(model => model.selected).length === 0;
    }

    public selectAllClimateModels() {
        this.climateModels.forEach(model => model.selected = true);
    }

    public updateClimateModels() {
        this.disableClimateModels();
        this.models = this.filterSelectedClimateModels();
        this.onModelsChanged.emit(this.models);
        this.updateButtonText();
    }

    public modalShow() {
        this.updateClimateModels();
    }

    public modalHide() {
        const models = this.filterSelectedClimateModels();
        if (models.length < 1) {
          this.selectAllClimateModels();
        }
        this.updateClimateModels();
    }

    private filterSelectedClimateModels() {
        return this.climateModels.filter(model => model.selected && model.enabled);
    }

    // subscribe to list of available models from API endpoint
    private getClimateModels() {
        this.climateModelService.list().subscribe(data => {
            this.climateModels = data;

            // Initialize 'selected' attributes with models in project
            if (this.models.length === 0) {
                this.selectAllClimateModels();
            } else if (this.dataset) {
                // dataset may be undefined for project if in form to create new project
                this.models.forEach(projectModel => {
                    this.climateModels.forEach(model => {
                        if (projectModel.name === model.name) {
                           model.selected = projectModel.selected;
                        }
                    });
                });
            }

            this.updateClimateModels();
        });
    }

    private updateButtonText() {
        this.buttonText = this.models.length ===
            this.dataset.models.length ? 'All available models' : 'Subset of models';
    }
}
