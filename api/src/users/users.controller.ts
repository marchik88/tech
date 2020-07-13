import {
  Req,
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Get,
  Query,
  Put,
  UseGuards,
  Param,
  Delete,
} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './schemas/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UsersService) {}

  @Post('profile')
  async register(@Body() body): Promise<User> {
    return this._userService.findOne(body);
  }

  @Get('all')
  async getall(@Query() query): Promise<Array<User>> {
    const { q } = query;
    const options = {};

    if (q)
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      options.$or = [
        { firstName: { $regex: `^${q}`, $options: 'i' } },
        { lastName: { $regex: `^${q}`, $options: 'i' } },
      ];
    return this._userService.findAll(options);
  }

  // @Get('availability')
  // async getallavailability(@Query() query): Promise<Array<User>> {
  //   const { q } = query;
  //   const options = {};

  //   if (q)
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  //     // @ts-ignore
  //     options.$or = [
  //       { firstName: { $regex: `^${q}`, $options: 'i' } },
  //       { lastName: { $regex: `^${q}`, $options: 'i' } },
  //     ];
  //   return this._userService.findAll(options);
  // }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async login(@Req() req): Promise<User> {
    const { user } = req;

    if (!user)
      throw new HttpException(`User Not Found`, HttpStatus.BAD_REQUEST);

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile/edit')
  async edit(@Req() req): Promise<User> {
    const { user, body } = req;

    if (!user)
      throw new HttpException(`User Not Found`, HttpStatus.BAD_REQUEST);

    return this._userService.edit(body, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  async edituser(@Body() body, @Param() param, @Req() req): Promise<User> {
    const { user } = req;
    const { id } = param;

    let order = null;

    try {
      order = await this._userService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `User Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return this._userService.edit(body, user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async remove(@Param() param): Promise<User> {
    return this._userService.remove(param.id);
  }
}
