import { Profile } from './profile';
import { Zone } from './zone';
import { Http } from '@angular/http';

export class Container {
  id: number;
  zone: Zone;
  type: number;
  location: string;
  coord_x: number;
  coord_y: number;
  latest_container_states: States;
  latest_location: Location;
  


}

export class States {
  state_type: number;
  states: State;
  created_at: Date;
}
export class State {
  value: number;
  alert_type: Alert;
  geo_x: number;
  geo_y: number;
}

export class Alert {
  id: number;
  name: String;
}

export class Location {
geo_x: number;
geo_y: number;
address?: string;

}

export class ContainerServiceResponse {
  data: Container[];
  last_page: number;
}

export class ContainerTask {
  date_done: Date;
  date_execution: Date;
  task: Task;


}

export class Task {
  task_type: TaskType;
  user_profile: Profile;
}

export class TaskType {
  name: String;
  description: String;
}

export class Plan {
  id: number;
  description: string;
  date_start: Date;
  date_end: Date;
  frecuency: Frecuency;
  task: Task;
  frecuency_type_id: number;
}

export class Frecuency {
  name: String;
}

export class PlanServiceResponse {
  data: Plan[];
  last_page: number;
}
