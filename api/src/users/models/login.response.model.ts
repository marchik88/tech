import { User } from '../schemas/user.entity';

export class LoginResponse {
  token: string;
  user: User;
}
