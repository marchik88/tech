import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginResponse } from './models/login.response.model';
import { RegisterResponse } from './models/register.response.model';
import { UsersService } from './users.service';

@Controller('auth')
export class UserAuthController {
  constructor(private readonly _userService: UsersService) {}

  @Post('register')
  async register(@Body() body): Promise<RegisterResponse> {
    const { email } = body;

    // ToDo: Middleware
    ['email', 'password', 'firstName', 'lastName'].forEach(field => {
      if (!body[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    let exist;
    try {
      exist = await this._userService.findOne({ email });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    if (exist) {
      throw new HttpException(
        `${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // const newUser = await this._userService.register(body);
    // return newUser;
    return this._userService.register(body);
  }

  @Post('login')
  async login(@Body() body): Promise<LoginResponse> {
    // ToDo: Guard
    if (!body)
      throw new HttpException(
        `'content-type': 'application/json' header is required`,
        HttpStatus.BAD_REQUEST,
      );
    // ToDo: Middleware
    ['email', 'password'].forEach(field => {
      if (!body[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    return this._userService.login(body);
  }
}
