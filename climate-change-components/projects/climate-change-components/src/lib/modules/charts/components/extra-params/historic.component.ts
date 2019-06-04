import { AfterViewInit, Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { HistoricRange } from '../../../api/models/historic-range.model';
import { HistoricIndicatorQueryParams } from '../../../api/models/historic-indicator-query-params.model';
import { HistoricRangeService } from '../../../api/services/historic-range.service';
import { Indicator } from '../../../api/models/indicator.model';

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
    public historicRangeOptions: number[] = [];

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
            historicCtl: [this.extraParams.historic_range],
        });

        this.historicForm.valueChanges.debounceTime(700).subscribe(form => {
            this.historicParamSelected.emit({
                'historic_range': form.historicCtl,
            });
        });
    }

    getHistoricRanges() {
        this.historicRangeService.list().subscribe(data => {
            this.historicRangeOptions = data.map(h => parseInt(h.start_year, 10));
            if (!this.extraParams.historic_range) {
              const latestHistoricRange = Math.max(...this.historicRangeOptions);
              this.historicForm.setValue({historicCtl: latestHistoricRange});
            }
        });
    }
}
