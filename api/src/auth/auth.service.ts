import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Services
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreate(profile): Promise<any> {
    const user = await this.usersService.findOne({ 'facebook.id': profile.id });
    // .exec();
    if (user) {
      return user;
    }
    // const createdUser = new this.userModel({
    //   email: profile.emails[0].value,
    //   firstName: profile.name.givenName,
    //   lastName: profile.name.familyName,
    //   Facebook: {
    //     id: profile.id,
    //     avatar: profile.photos[0].value,
    //   },
    // });
    // return createdUser.save();
  }

  async validateUserByPassword(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateUserByEmail(email: string): Promise<any> {
    const user = await this.usersService.findOne({ email });
    if (user) return user;
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, role: user.role };
    return {
      user,
      token: this.jwtService.sign(payload),
    };
  }
}
