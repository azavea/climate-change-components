
export enum HistoricPercentileParam {
  One = 1,
  Five = 5,
  NinetyFive = 95,
  NinetyNine = 99
}

const keys = Object.keys(HistoricPercentileParam).filter(k => {
  return typeof HistoricPercentileParam[k as any] === 'number';
});

export const HistoricPercentileParamOptions = keys.map(k => HistoricPercentileParam[k as any]);
