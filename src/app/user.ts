

export class User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  identification: string;
  root: boolean;
  user_profile_id: number;
  zone: number;
}

export class UserServiceResponse {
  data: User[];
  last_page: number;
}
