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

@Controller('tasks')
export class TaskController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create/:id/:oid')
  async create(@Body() body, @Param() param, @Req() req): Promise<Order> {
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
        `Order Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    // ToDo: Middleware
    ['count', 'workers'].forEach(field => {
      if (!body[field]) {
        throw new HttpException(`${field} is required`, HttpStatus.BAD_REQUEST);
      }
    });

    const findedOperation =
      (order.operations || []).find(o => o.num == oid) || {};

    if (!body.num)
      body.num =
        1 + (findedOperation.tasks || []).length + (Date.now() + '').slice(-5);
    body.createDate = new Date().toLocaleDateString().replace(/\/|\./g, '-');
    body.updated = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      date: new Date(),
    };

    const newTasks = [
      ...(findedOperation.tasks || []),
      { ...body, currentTime: 0 },
    ];

    this.orderService.editUser(
      { ...user, cntCreatedTasks: (user.cntCreatedTasks || 0) + 1 },
      user._id,
    );

    return this.orderService.edit(
      {
        operations: (order.operations || []).map(o =>
          o.num == oid ? { ...o, tasks: newTasks } : o,
        ),
      },
      { _id: id },
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id/:oid/:tid')
  async edit(@Body() body, @Param() param, @Req() req): Promise<Order> {
    const { user } = req;
    const { id, oid, tid } = param;

    let order = null;

    body.updated = {
      id: user._id,
      name: `${user.firstName} ${user.lastName}`,
      date: new Date(),
    };

    try {
      order = await this.orderService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Order Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return this.orderService.edit(
      {
        operations: (order.operations || []).map(o =>
          o.num == oid
            ? {
                ...o,
                tasks: (o.tasks || []).map(q =>
                  q.num == tid ? { ...q, ...body } : q,
                ),
              }
            : o,
        ),
      },
      { _id: id },
      user,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id/:oid/:tid')
  async remove(@Param() param, @Req() req): Promise<Order> {
    const { user } = req;
    const { id, oid, tid } = param;

    let order = null;

    try {
      order = await this.orderService.findOne({
        _id: new ObjectID(id),
      });
      if (!order) throw new HttpException(``, HttpStatus.BAD_REQUEST);
    } catch (error) {
      throw new HttpException(
        `Order Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return this.orderService.edit(
      {
        operations: (order.operations || []).map(o =>
          o.num == oid
            ? {
                ...o,
                tasks: (o.tasks || []).filter(q => q.num != tid),
              }
            : o,
        ),
      },
      { _id: id },
      user,
    );
  }
}
