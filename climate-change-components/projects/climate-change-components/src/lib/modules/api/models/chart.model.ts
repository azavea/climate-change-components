import { Indicator } from './indicator.model';

export class Chart {
  indicator: Indicator;
  unit: string;

  static fromJSON(obj: object) {
    return new Chart(obj);
  }

  constructor(obj: object) {
    Object.assign(this, obj);
  }

  public toJSON() {
    return {
      indicator: this.indicator,
      unit: this.unit
    };
  }
}
