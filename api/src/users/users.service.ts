import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ObjectID } from 'mongodb';
import { InjectRepository } from '@nestjs/typeorm';
// import * as nanoid from 'nanoid';
import { compare, genSalt, hash } from 'bcryptjs';
import { MongoRepository } from 'typeorm';
// Models
import { LoginResponse } from './models/login.response.model';
import { RegisterResponse } from './models/register.response.model';
import { User } from './schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly _userRepository: MongoRepository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findOne(options: object): Promise<User> {
    try {
      return await this._userRepository.findOne(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(props: object): Promise<Array<User>> {
    try {
      return await this._userRepository.find({
        ...props,
        select: [
          'firstName',
          'lastName',
          'email',
          'role',
          'photo',
          'createDate',
        ],
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async edit(body, uid): Promise<User> {
    try {
      delete body._id;
      console.log(body);

      const result = await this._userRepository.findOneAndUpdate(
        { _id: new ObjectID(uid) },
        { $set: body },
        { returnOriginal: false },
      );

      return result.value;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async register(body): Promise<RegisterResponse> {
    const { email, password, firstName, lastName } = body;

    const newUser = new User();
    newUser.email = (email || '').trim();
    newUser.firstName = firstName;
    newUser.lastName = lastName;
    newUser.role = 'user';

    const salt = await genSalt(10);
    newUser.password = await hash(password, salt);

    const token = await this.jwtService.sign({
      email: newUser.email,
      role: newUser.role,
    });

    try {
      const result = await this._userRepository.save(newUser);

      delete result.password;

      return {
        token,
        user: result,
      } as RegisterResponse;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(_id): Promise<User> {
    try {
      const result = await this._userRepository.findOneAndDelete({
        _id: new ObjectID(_id),
      });

      if (!result.value) {
        throw new HttpException(
          `User Not Exist`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      return result.value;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async login(body): Promise<LoginResponse> {
    const { email, password, enterType } = body;
    const options = {};

    enterType === 'worker' || email.includes('@')
      ? // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        (options.email = email)
      : // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        (options.phone = email);

    const user = await this._userRepository.findOne({ email });

    if (!user) {
      throw new HttpException('Invalid email', HttpStatus.NOT_FOUND);
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    const token = await this.jwtService.sign({
      email: user.email,
      role: user.role,
    });

    delete user.password;

    return { token, user };
  }
}
