import { Indicator } from './indicator.model';

export class Chart {
  indicator: Indicator;
  unit: string;

  static fromJSON(object: Object) {
    return new Chart(object);
  }

  constructor(object: Object) {
    Object.assign(this, object);
  }

  public toJSON() {
    return {
      indicator: this.indicator,
      unit: this.unit
    };
  }
}
