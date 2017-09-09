
export class Profile {
  id: number;
  name: string;
}

export class ProfileServiceResponse {
  data: Profile[];
  last_page: number;
}
