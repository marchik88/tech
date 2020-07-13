import {
  Req,
  Query,
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

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() body, @Req() req): Promise<Order> {
    const { user } = req;

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    const keyNames = {
      num: 'Номер заказа',
    };

    // ToDo: Middleware
    ['num'].forEach(field => {
      if (!body[field]) {
        throw new HttpException(
          `${keyNames[field]} не указан (обязательное поле)`,
          HttpStatus.BAD_REQUEST,
        );
      }
    });

    return this.orderService.create(body, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getall(@Req() req): Promise<any> {
    const { user } = req;
    const { q } = req.query;

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    const options = {
      order: { createDate: 'ASC' },
    };

    if (q) {
      delete options.order;
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      options.$or = [
        {
          name: { $regex: `^${q}`, $options: 'i' },
        },
        {
          num: { $regex: `${q}`, $options: 'i' },
        },
        {
          num: { $regex: `PROJECT${q}`, $options: 'i' },
        },
      ];
    }

    const docs = await this.orderService.findAll(options);

    return {
      docs,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('getone/:id')
  async getone(@Req() req): Promise<Order> {
    const { user } = req;

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return user;
  }

  @Get('available/name')
  async checkname(@Query() query): Promise<any> {
    const { name } = query;

    const order = await this.orderService.findOne({
      num: name,
    });

    return order && order._id ? { available: 'no' } : { available: 'yes' };
  }

  @UseGuards(JwtAuthGuard)
  @Put('edit/:id')
  async edit(@Body() body, @Param() param, @Req() req): Promise<Order> {
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
        `Order Not Found ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!user)
      throw new HttpException(`Auth Not Found`, HttpStatus.BAD_REQUEST);

    return this.orderService.edit(body, order, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('remove/:id')
  async remove(@Param() param): Promise<Order> {
    return this.orderService.remove(param.id);
  }
}
