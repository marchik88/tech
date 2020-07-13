import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import * as nanoid from 'nanoid';
import { ObjectID } from 'mongodb';
import { MongoRepository } from 'typeorm';
// Models
// import { RegisterResponse } from './models/register.response.model';
import { Order } from './schemas/order.entity';
import { User } from '../users/schemas/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: MongoRepository<Order>,
    @InjectRepository(User)
    private readonly _userRepository: MongoRepository<User>,
  ) {}

  async findAll(options: object): Promise<Array<Order>> {
    try {
      return await this.orderRepository.find(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(options: object): Promise<Order> {
    try {
      return await this.orderRepository.findOne(options);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(body, user): Promise<Order> {
    const { name, mainHeader, header, lessons } = body;

    const newOrder = new Order();
    newOrder.name = name;
    newOrder.mainHeader = mainHeader;
    newOrder.header = header;
    newOrder.lessons = lessons || [];
    newOrder.createDate = new Date();
    newOrder.updated = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      date: new Date(),
    };

    try {
      const result = await this.orderRepository.save(newOrder);

      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async edit(body, order, user): Promise<Order> {
    try {
      body.updated = {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        date: new Date(),
      };

      const result = await this.orderRepository.findOneAndUpdate(
        { _id: new ObjectID(order._id) },
        { $set: body },
        { returnOriginal: false },
      );

      return result.value;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async editUser(body, uid): Promise<User> {
    try {
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

  async remove(_id): Promise<Order> {
    try {
      const result = await this.orderRepository.findOneAndDelete({
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
