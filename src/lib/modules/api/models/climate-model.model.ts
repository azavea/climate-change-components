export interface ClimateModel {
  name: string;
  description: string;
  base_time: string;
  datasets: string[];
  enabled?: boolean;
  selected?: boolean;
}
