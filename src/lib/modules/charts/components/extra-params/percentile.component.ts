import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Indicator, PercentileIndicatorQueryParams } from '../../../../public_api';

/*
 * Percentile params component
 * Uni-field form to allow user to specify the percentile params
 */
@Component({
  selector: 'ccc-percentile-parameters',
  templateUrl: './percentile.component.html'
})
export class PercentileComponent implements AfterViewInit, OnInit {

    @Input() indicator: Indicator;
    @Input() extraParams: PercentileIndicatorQueryParams;
    @Output() percentileParamSelected = new EventEmitter<PercentileIndicatorQueryParams>();

    percentileForm: FormGroup;

    // default form values
    private defaultPercentile = 50;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        // must create form on init instead of constructor to capture @Input values
        this.createForm();
    }

    ngAfterViewInit() {
        // Since valueChanges triggers initially before parent is ready, wait until
        // parent is ready here and trigger it to draw chart with extra parameters.
        this.percentileParamSelected.emit({
            'percentile': this.percentileForm.controls.percentileCtl.value
        });
    }

    createForm() {
        this.percentileForm = this.formBuilder.group({
            percentileCtl: [this.extraParams.percentile || this.defaultPercentile, Validators.required]
        });

        this.percentileForm.valueChanges.debounceTime(700).subscribe(form => {
            // only accept percentiles [1, 100] as integers
            const pctl = form.percentileCtl;
            if (pctl > 100 || pctl < 1) { return; }
            this.percentileParamSelected.emit({
                // TODO: #243 proper form feedback instead of rounding
                'percentile': Math.round(pctl)
            });
        });
    }
}
