import { Feature, Point } from 'geojson';

export interface CityProperties {
  name: string;
  admin: string;
  population?: number;
  datasets: string[];
  region: number;
}

export interface City {
  id?: string;
  type: string;
  geometry: Point;
  properties: CityProperties;
}
