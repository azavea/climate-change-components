import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import {
  HistoricRange,
  HistoricIndicatorQueryParams,
  HistoricRangeService,
  Indicator
} from '../../../../public_api';

/*
 * Historic range params component
 * Form to allow user to specify the historic range base year param
 */
@Component({
  selector: 'ccc-historic-parameters',
  templateUrl: './historic.component.html'
})
export class HistoricComponent implements AfterViewInit, OnInit {

    @Input() indicator: Indicator;
    @Input() extraParams: HistoricIndicatorQueryParams;
    @Output() historicParamSelected = new EventEmitter<HistoricIndicatorQueryParams>();

    historicForm: FormGroup;
    public historicRangeOptions: string[] = [];

    // default form values
    private defaultHistoric = null;

    constructor(private formBuilder: FormBuilder,
                private historicRangeService: HistoricRangeService) {}

    ngOnInit() {
        // must create form on init instead of constructor to capture @Input values
        this.createForm();
        this.getHistoricRanges();
    }

    ngAfterViewInit() {
        // Since valueChanges triggers initially before parent is ready, wait until
        // parent is ready here and trigger it to draw chart with extra parameters.
        this.historicParamSelected.emit({
            'historic_range': this.historicForm.controls.historicCtl.value,
        });
    }

    createForm() {
        this.historicForm = this.formBuilder.group({
            historicCtl: [this.extraParams.historic_range || this.defaultHistoric],
        });

        this.historicForm.valueChanges.debounceTime(700).subscribe(form => {
            this.historicParamSelected.emit({
                'historic_range': form.historicCtl,
            });
        });
    }

    getHistoricRanges() {
        this.historicRangeService.list().subscribe(data => {
            this.historicRangeOptions = data.map(h => h.start_year);
            // add empty option, as this is not a required parameter
            this.historicRangeOptions.unshift('');
        });
    }
}