import {
  Req,
  Body,
  Param,
  Controller,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ObjectID } from 'mongodb';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { SettingsService } from './settings.service';
import { Settings } from './schemas/settings.entity';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getall(@Req() req): Promise<any> {
    const { user } = req;

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    const lists = (await this.settingsService.findAll({})) || [];

    return lists;
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('add')
  // async create(@Body() body, @Req() req): Promise<Settings> {
  //   const { user } = req;

  //   if (!user)
  //     throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

  //   return this.settingsService.create(body, user);
  // }

  // @UseGuards(JwtAuthGuard)
  // @Post('add/operation')
  // async addOperation(@Body() body, @Req() req): Promise<Settings> {
  //   const { user } = req;

  //   if (!user)
  //     throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

  //   return this.settingsService.addListByType(body, 'operations');
  // }

  @UseGuards(JwtAuthGuard)
  @Put('edit')
  async edit(@Body() body, @Param() param, @Req() req): Promise<Settings> {
    const { user } = req;

    let settings = null;

    try {
      settings = await this.settingsService.findOne({
        type: body.type,
        mode: body.mode,
      });
      if (!settings) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Settings Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return this.settingsService.edit(body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async remove(@Param() param): Promise<Settings> {
    return this.settingsService.remove(param.id);
  }
}
