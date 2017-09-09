import { Zone } from './zone';

export class Container {
  id: number;
  zone: Zone;
  type: number;
  location: string;
  coord_x: number;
  coord_y: number;
  latest_container_states: string;
  latest_location: Location;
}

export class Location {
geo_x: number;
geo_y: number;

}

export class ContainerServiceResponse {
  data: Container[];
  last_page: number;
}
