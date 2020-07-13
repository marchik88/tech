import { User } from '../schemas/user.entity';

export class RegisterResponse {
  token: string;
  user: User;
}
