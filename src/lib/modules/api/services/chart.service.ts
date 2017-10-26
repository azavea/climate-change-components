import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { ChartData } from '../models/chart-data.model';
import { MultiDataPoint } from '../models/multi-data-point.model';

import * as moment from 'moment';
import * as _ from 'lodash';
import * as D3 from 'd3';

/*
 * Chart Service
 * Data management and operations for charts
 */
@Injectable()
export class ChartService {

    private timeOptions = {
          'yearly': '%Y',
          'monthly': '%Y-%m'
        };

    constructor() {}

    // return an array of date strings for each day in the given year
    getDaysInYear(year: number): string[] {
        const oneDate = moment.utc(+year + '-01-01', 'YYYY-MM-DD', true);
        const days: string[] = [];
        while (oneDate.get('year') === year) {
            days.push(oneDate.format('YYYY-MM-DD'));
            oneDate.add(1, 'day');
        }
        return days;
    }

    // map array of IndicatorService.getData responses to date for each data point
    // and drop top-level year key
    convertChartData(data: any[]): ChartData[] {

        // Convert list of indicator data responses to object keyed by indicator name
        // If multiple requests for the same indicator are present, the data will
        //  be combined
        // Once combined, sort indicator data MultiDataPoints by date ascending
        //  and return as array of ChartData objects
        const indicators = data.reduce((i, obj) => {
            const indicatorData: MultiDataPoint[] = [];
            const indicator = obj.indicator;
            const timeFormat = this.timeOptions[obj.time_aggregation];
            const parseTime = D3.timeParse(timeFormat);

            if (indicator && !i[indicator.name]) {
                i[indicator.name] = {
                    'indicator': indicator,
                    'data': [],
                    'time_aggregation': obj.time_aggregation,
                    'time_format': timeFormat
                };
            }

            _.each(obj.data, (values, key) => {
                i[indicator.name].data.push({
                    'date': parseTime(key),
                    'values': values
                } as MultiDataPoint);
            });

            return i;
        }, {});

        return _(indicators).values().each(chartData => {
            _.sortBy(chartData.data, 'date');
        });
    }
}
