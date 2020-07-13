import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as nanoid from 'nanoid';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
// Models
// import { RegisterResponse } from './models/register.response.model';
import { Settings } from './schemas/settings.entity';
import { User } from '../users/schemas/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private readonly settingsRepository: MongoRepository<Settings>,
    @InjectRepository(User)
    private readonly _userRepository: MongoRepository<User>,
  ) {}

  async findAll(options: object): Promise<Array<Settings>> {
    try {
      return await this.settingsRepository.find(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(options: object): Promise<Settings> {
    try {
      return await this.settingsRepository.findOne(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(options: object): Promise<Settings> {
    try {
      return await this.settingsRepository.findOne(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async edit(body): Promise<Settings> {
    try {
      const pureObj = { ...body };

      delete pureObj.type;
      delete pureObj.mode;

      const result = await this.settingsRepository.findOneAndUpdate(
        { type: body.type, mode: body.mode },
        { $set: pureObj },
        { returnOriginal: false },
      );

      return result.value || {};
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(_id): Promise<Settings> {
    try {
      const result = await this.settingsRepository.findOneAndDelete({
        _id: new ObjectID(_id),
      });

      if (!result.value) {
        throw new HttpException(
          `Order Not Exist`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return result.value;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
