// Provides utility methods for checking which sort of extra parameters a given indicator uses.

const thresholdIndicatorNames = [
    'max_temperature_threshold',
    'min_temperature_threshold',
    'precipitation_threshold'
];

const basetempIndicatorNames = [
    'cooling_degree_days',
    'heating_degree_days'
];

const historicIndicatorNames = [
    'heat_wave_duration_index',
    'heat_wave_incidents',
    'extreme_heat_events',
    'extreme_precipitation_events'
];

const percentileIndicatorNames = [
    'percentile_high_temperature',
    'percentile_low_temperature',
    'percentile_precipitation',
    'extreme_heat_events',
    'extreme_precipitation_events'
];

const extraParamsIndicatorNames = [].concat(thresholdIndicatorNames,
                                            percentileIndicatorNames,
                                            historicIndicatorNames);

export const TemperatureUnits: any[] = [
    {'key': 'K', 'label': 'Kelvin'},
    {'key': 'F', 'label': 'Farenheit'},
    {'key': 'C', 'label': 'Centigrade'}
 ];

export const PrecipitationUnits: any[] = [
    {'key': 'mm', 'label': 'millimeters'},
    {'key': 'in', 'label': 'inches'},
    {'key': 'kg/m^2', 'label': 'kg/m^2'}
];

export function isBasetempIndicator(indicatorName: string): boolean {
    return basetempIndicatorNames.indexOf(indicatorName) !== -1;
}

export function isHistoricIndicator(indicatorName: string): boolean {
    return historicIndicatorNames.indexOf(indicatorName) !== -1;
}

export function isThresholdIndicator(indicatorName: string): boolean {
    return thresholdIndicatorNames.indexOf(indicatorName) !== -1;
}

// TODO: use or remove this function
export function hasExtraParams(indicatorName: string): boolean {
    return extraParamsIndicatorNames.indexOf(indicatorName) !== -1;
}

export function isPercentileIndicator(indicatorName: string): boolean {
    return percentileIndicatorNames.indexOf(indicatorName) !== -1;
}
