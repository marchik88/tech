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
import { OrdersService } from './orders.service';
import { Order } from './schemas/order.entity';

@Controller('operations')
export class LessonController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:id')
  async create(@Body() body, @Param() param, @Req() req): Promise<Order> {
    const { user } = req;
    const { id } = param;

    let order = null;

    try {
      order = await this.orderService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Заказ не найден ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    if (!body.num) body.num = 1 + (order.operations || []).length;
    body.tasks = [];
    body.quality = [];
    body.updated = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      date: new Date(),
    };

    const newOperations = [...order.operations, { ...body }];

    return this.orderService.edit(
      { operations: newOperations },
      { _id: id },
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id/:oid')
  async edit(@Body() body, @Param() param, @Req() req): Promise<Order> {
    const { user } = req;
    const { id, oid } = param;

    body.updated = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      date: new Date(),
    };

    let order = null;

    try {
      order = await this.orderService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Заказ не найден ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    const newOperations = [
      ...order.operations.map(o => (o.num != oid ? o : { ...o, ...body })),
    ];

    return this.orderService.edit(
      { operations: newOperations },
      { _id: id },
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id/:oid')
  async remove(@Param() param, @Req() req): Promise<Order> {
    const { user } = req;
    const { id, oid } = param;

    let order = null;

    try {
      order = await this.orderService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Заказ не найден ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    const newOperations = [...order.operations.filter(o => o.num != oid)];

    return this.orderService.edit(
      { operations: newOperations },
      { _id: id },
      user,
    );
  }
}
