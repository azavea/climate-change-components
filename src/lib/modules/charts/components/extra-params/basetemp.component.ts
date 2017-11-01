import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BasetempIndicatorQueryParams, Indicator, TemperatureUnits } from '../../../../public_api';

/*
 * Basetemp params component
 * Multi-field form to allow user to specify the basetemp params
 */
@Component({
  selector: 'ccc-basetemp-parameters',
  templateUrl: './basetemp.component.html'
})
export class BasetempComponent implements AfterViewInit, OnInit {

    @Input() indicator: Indicator;
    @Input() extraParams: BasetempIndicatorQueryParams;
    @Output() basetempParamSelected = new EventEmitter<BasetempIndicatorQueryParams>();

    basetempForm: FormGroup;

    // default form values
    public defaultBasetemp = 50;
    public defaultBasetempUnit = 'F';
    public temperatureUnits = TemperatureUnits;

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        // must create form on init instead of constructor to capture @Input values
        this.createForm();
    }

    ngAfterViewInit() {
        // Since valueChanges triggers initially before parent is ready, wait until
        // parent is ready here and trigger it to draw chart with extra parameters.
        this.basetempParamSelected.emit({
            'basetemp': this.basetempForm.controls.basetempCtl.value,
            'basetemp_units': this.basetempForm.controls.basetempUnitCtl.value
        });
    }

    createForm() {
        this.basetempForm = this.formBuilder.group({
            basetempCtl: [this.extraParams.basetemp || this.defaultBasetemp, Validators.required],
            basetempUnitCtl: [this.extraParams.basetemp_units || this.defaultBasetempUnit, Validators.required]
        });

        this.basetempForm.valueChanges.debounceTime(700).subscribe(form => {
            this.basetempParamSelected.emit({
                'basetemp': form.basetempCtl,
                'basetemp_units': form.basetempUnitCtl
            });
        });
    }
}
