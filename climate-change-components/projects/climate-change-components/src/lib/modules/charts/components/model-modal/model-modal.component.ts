import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { ClimateModel } from '../../../api/models/climate-model.model';
import { ClimateModelService } from '../../../api/services/climate-model.service';
import { Dataset } from '../../../api/models/dataset.model';
import { ModalOptions, ModalDirective } from 'ngx-bootstrap/modal';

/*  Model Modal Component
    -- Requires input for selected dataset and models
    -- Emits selected model
    -- Items passed to [config] input are merged with the component's DEFAULT_MODAL_OPTIONS
    Expected use:
        <ccc-model-modal
            [config]="bsModalOptions"
            [dataset]="yourDataset"
            [models]="yourSelectedModels"
            (onModelsChanged)="modelsChanged($event)">
*/

@Component({
  selector: 'ccc-model-modal',
  templateUrl: './model-modal.component.html'
})
export class ModelModalComponent implements OnInit {

    @Input() config: ModalOptions;
    @Input() dataset: Dataset;
    @Input() models: ClimateModel[];

    @Output() onModelsChanged = new EventEmitter<ClimateModel[]>();

    public buttonText: string;
    public climateModels: ClimateModel[];
    public modalOptions: ModalOptions;
    public smModal: any;
    public readonly DEFAULT_MODAL_OPTIONS = { backdrop: 'static' };

    @ViewChild(ModalDirective) modal: ModalDirective;

    constructor(private climateModelService: ClimateModelService) {}

    ngOnInit() {
        this.modalOptions = Object.assign({}, this.DEFAULT_MODAL_OPTIONS, this.config);
        this.climateModels = [];  // initialize with empty list while modal loads
        this.getClimateModels();
    }

    // unselect all model checkboxes when option to use all models selected
    public clearClimateModels() {
        this.climateModels.forEach(model => model.selected = false);
    }

    // disable models not valid for the project dataset
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
        if (!(this.climateModels && this.dataset)) { return; }

        this.disableClimateModels();
        this.models = this.filterSelectedClimateModels();
        this.onModelsChanged.emit(this.models);
        this.updateButtonText();
    }

    public modalShow() {
        this.updateClimateModels();
    }

    public updateModelSelection() {
        this.hide();

        const models = this.filterSelectedClimateModels();
        if (models.length < 1) {
          this.selectAllClimateModels();
        }
        this.updateClimateModels();
    }

    public hide() {
        if (this.modal) {
            this.modal.hide();
        }
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
