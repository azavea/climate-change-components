import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HistoricRange } from '../../../api/models/historic-range.model';
import { PercentileHistoricIndicatorQueryParams } from '../../../api/models/percentile-historic-indicator-query-params.model';
import { HistoricRangeService } from '../../../api/services/historic-range.service';
import { Indicator } from '../../../api/models/indicator.model';

/*
  * Historic range params component
 * Form to allow user to specify the historic range base year param
 */
@Component({
  selector: 'ccc-percentile-historic-parameters',
  templateUrl: './percentile-historic.component.html'
})
export class PercentileHistoricComponent implements AfterViewInit, OnInit {

    @Input() indicator: Indicator;
    @Input() extraParams: PercentileHistoricIndicatorQueryParams;
    @Output() percentileHistoricParamSelected = new EventEmitter<PercentileHistoricIndicatorQueryParams>();

    percentileHistoricForm: FormGroup;
    public historicRangeOptions: number[] = [];

    // default form values
    private defaultPercentile = 50;

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
        this.percentileHistoricParamSelected.emit({
            'percentile': this.percentileHistoricForm.controls.percentileCtl.value,
            'historic_range': this.percentileHistoricForm.controls.historicCtl.value,
        });
    }

    createForm() {
        this.percentileHistoricForm = this.formBuilder.group({
            historicCtl: [this.extraParams.historic_range],
            percentileCtl: [this.extraParams.percentile || this.defaultPercentile, Validators.required]
        });

        this.percentileHistoricForm.valueChanges.debounceTime(700).subscribe(form => {
            // only accept percentiles [1, 100] as integers
            const pctl = form.percentileCtl;
            if (pctl > 100 || pctl < 1) { return; }
            this.percentileHistoricParamSelected.emit({
                'historic_range': form.historicCtl,
                // TODO: #243 proper form feedback instead of rounding
                'percentile': Math.round(pctl)
            });
        });
    }

    getHistoricRanges() {
        this.historicRangeService.list().subscribe(data => {
            this.historicRangeOptions = data.map(h => parseInt(h.start_year, 10));
            if (!this.extraParams.historic_range) {
              const latestHistoricRange = Math.max(...this.historicRangeOptions);
              this.percentileHistoricForm.setValue({
                historicCtl: latestHistoricRange,
                percentileCtl: this.percentileHistoricForm.controls.percentileCtl.value
              });
            }
        });
    }
}
